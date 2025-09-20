import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { ContractAdd } from "../contracts/contract";
import { ABI } from "../contracts/contract";
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(localStorage.getItem("account") || "");
  const [contract, setContract] = useState(null);
  const [first, setFirst] = useState(false)
  const [isConnected, setIsConnected] = useState(!!localStorage.getItem("account"));
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(0);

  const initializeContract = useCallback(async (accountAddress) => {
    console.log("Init cont triggered")
    if (!accountAddress || !window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(ContractAdd, ABI, signer);
      
      setContract(contractInstance)
      // console.log("is First time  : ", await contractInstance.userExist(accountAddress) )
        
      setContract(contractInstance);
      setFirst(await contractInstance.userExist(accountAddress))
      setAccount(accountAddress);
      setIsConnected(true);
      localStorage.setItem('account', accountAddress);
      console.log("here is account : ", accountAddress)
    //   try {
    //     await contractInstance.getFstBal()
    //   } catch (error) {
    //      console.log("Non first time logging error")
    //   }
    //   const initialBalance = await contractInstance.getBalance();
    //   console.log("got balance")
    //   setBalance(Number(initialBalance));
    //   console.log("Here is user balance:",balance)
      
    //   const allContents = await contractInstance.getAllContents();
    //   setContents(allContents);
      
      return contractInstance;
    } catch (error) {
      console.error("Error initializing contract:", error);
      setError("Failed to initialize contract");
      return null;
    }
  }, []);

    const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to use this app.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        const contractInstance = await initializeContract(accounts[0]);
        
        // if (contractInstance) {
        //   await contractInstance.getFstBal();
        // }
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setError("Failed to connect wallet");
    }
  };

  const handleDisconnect = useCallback(() => {
    setAccount("");
    setContract(null);
    setIsConnected(false);
    // setBalance(0);
    // setContents([]);
    localStorage.removeItem('account');
  }, []);

  
  useEffect(() => {
    const savedAccount = localStorage.getItem('account');
    if (savedAccount && window.ethereum) {
      initializeContract(savedAccount);
    }
  }, [initializeContract]);

    return (
    <WalletContext.Provider value={{ 
      account, 
      contract, 
      isConnected, 
      connectWallet, 
    //   balance, 
      handleDisconnect, 
      error,
      first,
    //   contents,
      initializeContract
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);