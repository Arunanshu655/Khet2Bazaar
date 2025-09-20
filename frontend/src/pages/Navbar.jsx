import { Wheat,LogOut, HomeIcon, Wallet, LucideLayoutDashboard, LucideLanguages, LineChart , User} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation();
    const { 
    account, 
    contract, 
    first,
    connectWallet, 
    handleDisconnect, 
    initializeContract,
    balance, 
    isConnected,
    setBalance
  } = useWallet();

    useEffect(() => {
      if(contract){
        console.log(" Here is contract : ", contract)
        console.log("account : ", account)
        // if(!first) navigate('/signup')
      }
      

    }, [contract,first])
   const handleWalletClick = async () => {
  if (isConnected) {
    handleDisconnect();
    // toast.info("Wallet disconnected");
  } else {
    try {
      await connectWallet();
      await initializeContract()
        
     
      
      // toast.success("Metamask connected successfully!");
    } catch (error) {
      // toast.error("Failed to connect wallet ❌");
      console.log("error : ", error)
    }
  }
};

  const formatAccount = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Wheat className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Khet2Bazaar</h1>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className={`flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-green-800 ${location.pathname === '/' ? 'text-green-600' : ''}`}>
              <HomeIcon className="w-5 h-5" />
              <span className="text-sm">Home</span>
            </Link>
            <Link to="/dashboard" className={`flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-green-800 ${location.pathname === '/dashboard' ? 'text-green-600' : ''}`}>
              <LucideLayoutDashboard className="w-5 h-5" />
              <span className="text-sm">Dashboard</span>
            </Link>
            <div onClick= {handleWalletClick} className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-green-800">
              {isConnected ? (
              <>
                <LogOut size={18} />
                <span>{formatAccount(account)}</span>
              </>
            ) : (
              <>
                <Wallet size={18} />
                <span>Connect Wallet</span>
              </>
            )}
            </div>
            <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-green-800">
              <LucideLanguages className="w-5 h-5" />
              <span className="text-sm">Languages</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-green-800">
              <User className="w-5 h-5" />
              <span className="text-sm">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;