import { Wheat, HomeIcon, Wallet, LucideLayoutDashboard } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Wheat className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Khet2Bazaar</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-green-800">
              <HomeIcon className="w-5 h-5" />
              <span className="text-sm">Home</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-green-800">
              <LucideLayoutDashboard className="w-5 h-5" />
              <span className="text-sm">Dashboard</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-green-800">
              <Wallet className="w-5 h-5" />
              <span className="text-sm">Connect Wallet</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;