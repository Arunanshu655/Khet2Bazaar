// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


contract yChain {
   
    address public admin;
    uint256 private nextProduceId = 1;
    uint256 private nextGroupId = 1;

   
    uint8 private _locked = 1;
    modifier nonReentrant() {
        require(_locked == 1, "reentrant");
        _locked = 2;
        _;
        _locked = 1;
    }

    constructor() {
        admin = msg.sender;
    }

   
    mapping(address => bool) public isVerifier;
    mapping(address => bool) public isOracle;
    mapping(address => bool) public isServiceProvider;

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    } 
    //govt empyoy verify er jonne
    modifier onlyVerifier() {
        require(isVerifier[msg.sender], "only verifier");
        _;
    }

    //ai price er jnne
    modifier onlyOracle() {
        require(isOracle[msg.sender], "only oracle");
        _;
    }

//transport ta dekhbe 

    modifier onlyServiceProvider() {
        require(isServiceProvider[msg.sender], "only service provider");
        _;
    }

    function setVerifier(address account, bool allowed) external onlyAdmin {
        isVerifier[account] = allowed;
    }
    function setOracle(address account, bool allowed) external onlyAdmin {
        isOracle[account] = allowed;
    }
    function setServiceProvider(address account, bool allowed) external onlyAdmin {
        isServiceProvider[account] = allowed;
    }
    function transferAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "zero admin");
        admin = newAdmin;
    }

   
    struct Produce {
        uint256 id;
        address owner;         // farmer (initial owner)
        string metadataURI;    // IPFS or JSON URI
        uint256 weight;        // in chosen units
        uint256 suggestedPrice; // wei (per batch or per unit - define in front-end)
        uint256 predictedPriceNextMonth; // wei
        bool verified;
        uint256 groupId;       // 0 = none
        uint256 serviceFee;    // wei
        bool listed;
        uint256 salePrice;     // wei (price buyer pays)
    }

    struct Escrow {
        address buyer;
        address transporter;
        uint256 totalPaid; // salePrice + serviceFee dutoi mile
        bool exists;
    }

    struct Group {
        uint256 id;
        string name;
        address creator;
        address[] members;
        bool active;
    }


    mapping(uint256 => Produce) public produces; // produceId => Produce
    mapping(uint256 => Escrow) public escrows;   // produceId => Escrow
    mapping(uint256 => Group) public groups;     // groupId => Group

    
    mapping(uint256 => address) public ownerOfProduce; // produceId => owner

   
    mapping(address => uint8) public farmerBadge;

    event ProduceMinted(uint256 indexed produceId, address indexed farmer, string uri);
    event ProduceVerified(uint256 indexed produceId, address indexed verifier);
    event SuggestedPriceSet(uint256 indexed produceId, uint256 price);
    event PredictedPriceSet(uint256 indexed produceId, uint256 price);
    event ProduceListed(uint256 indexed produceId, uint256 salePrice, uint256 serviceFee);
    event ProduceUnlisted(uint256 indexed produceId);
    event Bought(uint256 indexed produceId, address indexed buyer, address transporter, uint256 totalPaid);
    event DeliveryConfirmed(uint256 indexed produceId, address indexed confirmer);
    event PurchaseCancelled(uint256 indexed produceId, address indexed canceller);
    event GroupCreated(uint256 indexed groupId, string name, address indexed creator);
    event JoinedGroup(uint256 indexed groupId, address indexed member);
    event BadgeAssigned(address indexed farmer, uint8 badgeLevel);



    function mintProduce(
        string calldata metadataURI,
        uint256 weight,
        uint256 suggestedPrice,
        uint256 serviceFee
    ) external returns (uint256) {
        uint256 pid = nextProduceId++;
        produces[pid] = Produce({
            id: pid,
            owner: msg.sender,
            metadataURI: metadataURI,
            weight: weight,
            suggestedPrice: suggestedPrice,
            predictedPriceNextMonth: 0,
            verified: false,
            groupId: 0,
            serviceFee: serviceFee,
            listed: false,
            salePrice: 0
        });
        ownerOfProduce[pid] = msg.sender;
        emit ProduceMinted(pid, msg.sender, metadataURI);
        return pid;
    }

   // govt empty eta verify korbe 
    function verifyProduce(uint256 produceId) external onlyVerifier {
        require(produces[produceId].id != 0, "no produce");
        produces[produceId].verified = true;
        emit ProduceVerified(produceId, msg.sender);
    }

    // /// badge debe farmer based on quality
    // function assignBadge(address farmer, uint8 badgeLevel) external onlyVerifier {
    //     require(badgeLevel <= 3, "invalid badge");
    //     farmerBadge[farmer] = badgeLevel;
    //     emit BadgeAssigned(farmer, badgeLevel);
    // }

    /// ai price dbe
    function setSuggestedPrice(uint256 produceId, uint256 suggestedPrice) external onlyOracle {
        require(produces[produceId].id != 0, "no produce");
        produces[produceId].suggestedPrice = suggestedPrice;
        emit SuggestedPriceSet(produceId, suggestedPrice);
    }

    // /// ai predicttion dbe next month 
    // function setPredictedPrice(uint256 produceId, uint256 predictedPrice) external onlyOracle {
    //     require(produces[produceId].id != 0, "no produce");
    //     produces[produceId].predictedPriceNextMonth = predictedPrice;
    //     emit PredictedPriceSet(produceId, predictedPrice);
    // }

   

    /// owner sale er jonne charbe
    function listProduceForSale(uint256 produceId, uint256 salePrice) external {
        require(produces[produceId].id != 0, "no produce");
        require(ownerOfProduce[produceId] == msg.sender, "not owner");
        produces[produceId].listed = true;
        produces[produceId].salePrice = salePrice;
        emit ProduceListed(produceId, salePrice, produces[produceId].serviceFee);
    }

    /// unlist korbe owner 
    function unlistProduce(uint256 produceId) external {
        require(produces[produceId].id != 0, "no produce");
        require(ownerOfProduce[produceId] == msg.sender, "not owner");
        produces[produceId].listed = false;
        produces[produceId].salePrice = 0;
        emit ProduceUnlisted(produceId);
    }

    /// buyer transport ar  actual price duto add kore diye kinbe 
    function buyProduce(uint256 produceId, address transporter) external payable nonReentrant {
        require(produces[produceId].id != 0, "no produce");
        Produce storage p = produces[produceId];
        require(p.listed, "not listed");
        require(transporter != address(0), "transporter required");
        require(isServiceProvider[transporter], "transporter not registered");

        uint256 total = p.salePrice + p.serviceFee;
        require(msg.value == total, "send exact amount");

        require(!escrows[produceId].exists, "already in escrow");

        escrows[produceId] = Escrow({
            buyer: msg.sender,
            transporter: transporter,
            totalPaid: msg.value,
            exists: true
        });

        emit Bought(produceId, msg.sender, transporter, msg.value);
    }

    /// delivery confirm kore fund release korbe
    function confirmDelivery(uint256 produceId) external nonReentrant {
        require(produces[produceId].id != 0, "no produce");
        Escrow memory e = escrows[produceId];
        require(e.exists, "no escrow");
        address seller = ownerOfProduce[produceId];
        require(msg.sender == e.buyer || msg.sender == seller || isVerifier[msg.sender], "not authorized");

        uint256 salePrice = produces[produceId].salePrice;
        uint256 serviceFee = produces[produceId].serviceFee;
        address payable farmerPay = payable(seller);
        address payable transporterPay = payable(e.transporter);

        // Cler escow 
        delete escrows[produceId];

        // Transfer hobe ownership ta
        ownerOfProduce[produceId] = e.buyer;

        // Mark unlisted
        produces[produceId].listed = false;
        produces[produceId].salePrice = 0;

        // Send funds: salePrice -> farmer, serviceFee -> transporter
        (bool s1, ) = farmerPay.call{value: salePrice}("");
        require(s1, "transfer to farmer failed");

        (bool s2, ) = transporterPay.call{value: serviceFee}("");
        require(s2, "transfer to transporter failed");

        emit DeliveryConfirmed(produceId, msg.sender);
    }

    /// seller or vefifier cancell korte prbe order taa

    function cancelPurchase(uint256 produceId) external nonReentrant {
        Escrow memory e = escrows[produceId];
        require(e.exists, "no escrow");
        address seller = ownerOfProduce[produceId];
        require(msg.sender == seller || isVerifier[msg.sender], "not authorized to cancel");

        address payable buyerPay = payable(e.buyer);
        uint256 refund = e.totalPaid;

        delete escrows[produceId];

        (bool refunded, ) = buyerPay.call{value: refund}("");
        require(refunded, "refund failed");

        emit PurchaseCancelled(produceId, msg.sender);
    }

  
  /// ekhne sob farmer ra grp create korte prbe 

    // function createGroup(string calldata name) external returns (uint256) {
    //     uint256 gid = nextGroupId++;
    //     groups[gid].id = gid;
    //     groups[gid].name = name;
    //     groups[gid].creator = msg.sender;
    //     groups[gid].active = true;
    //     groups[gid].members.push(msg.sender);
    //     emit GroupCreated(gid, name, msg.sender);
    //     return gid;
    // }

    // function joinGroup(uint256 groupId) external {
    //     require(groups[groupId].active, "group inactive");
    //     groups[groupId].members.push(msg.sender);
    //     emit JoinedGroup(groupId, msg.sender);
    // }

    // function assignProduceToGroup(uint256 produceId, uint256 groupId) external {
    //     require(produces[produceId].id != 0, "no produce");
    //     require(ownerOfProduce[produceId] == msg.sender, "not owner");
    //     require(groups[groupId].active, "group inactive");
    //     produces[produceId].groupId = groupId;
    // }

    /// member khuje pao

    // function getGroupMembers(uint256 groupId) external view returns (address[] memory) {
    //     return groups[groupId].members;
    // }

    
    // Admin withdraw (in case contract receives stray ETH)
   
    // function adminWithdraw(uint256 amount, address payable to) external onlyAdmin nonReentrant {
    //     require(address(this).balance >= amount, "insufficient balance");
    //     (bool ok, ) = to.call{value: amount}("");
    //     require(ok, "withdraw failed");
    // }

    // Allow contract to receive ETH for escrow
    receive() external payable {}
    fallback() external payable {}
}
