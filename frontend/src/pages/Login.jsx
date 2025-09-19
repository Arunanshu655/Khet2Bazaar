import { useState } from 'react';
import { Wheat, Truck, Store } from 'lucide-react';
import Navbar from './Navbar';
import Signup from './Signup';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('retailer');
  const [formData, setFormData] = useState({
    phoneOrEmail: '',
    password: '',
    rememberMe: false
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const roles = [
    {
      id: 'farmer',
      name: 'Farmer',
      icon: Wheat,
      description: 'Sell your produce directly'
    },
    {
      id: 'distributor',
      name: 'Distributor',
      icon: Truck,
      description: 'Manage supply chain operations'
    },
    {
      id: 'retailer',
      name: 'Retailer',
      icon: Store,
      description: 'Purchase agricultural products'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { ...formData, role: selectedRole });
    // Add your login logic here
  };

  const handleSignUp = () => {
    setShowSignup(true);
  };

  const handleForgotPassword = () => {
    console.log('Password reset requested');
    setShowForgotPassword(false);
    // Add password reset logic here
  };

  const getRoleWelcome = () => {
    const role = roles.find(r => r.id === selectedRole);
    return {
      title: `Welcome ${role?.name}`,
      description: `Sign in to access your ${selectedRole} dashboard and manage your agricultural business`,
      icon: role?.icon
    };
  };

  if (showSignup) {
    return <Signup onBackToLogin={() => setShowSignup(false)} />;
  }

  const welcome = getRoleWelcome();
  const WelcomeIcon = welcome.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen py-12 px-4 pt-24">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Logo and Welcome */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center">
                  <Wheat className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900">Khet2Bazaar</h2>
                  <p className="text-sm text-gray-500">Agricultural Marketplace</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <WelcomeIcon className="w-5 h-5 text-green-800" />
                <h3 className="text-lg font-semibold text-gray-900">{welcome.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                {welcome.description}
              </p>

            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4 text-center">
                Select Your Role
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  const isSelected = selectedRole === role.id;
                  
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                        isSelected
                          ? 'border-green-800 bg-green-800 text-white'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      <div className="flex justify-center mb-2">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium mb-1">
                        {role.name}
                      </p>
                      <p className="text-xs leading-tight">
                        {role.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login Form */}
            <div className="space-y-4">
              {/* Phone/Email Input */}
              <div>
                <label htmlFor="phoneOrEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number or Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="phoneOrEmail"
                  name="phoneOrEmail"
                  value={formData.phoneOrEmail}
                  onChange={handleInputChange}
                  placeholder="Phone number or email address"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                  required
                />
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-800 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-green-800 hover:text-green-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-green-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2 text-sm"
              >
                <span>→</span>
                <span>Login as {selectedRole}</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={handleSignUp}
                  className="text-green-800 hover:text-green-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reset Password</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleForgotPassword}
                className="flex-1 px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;