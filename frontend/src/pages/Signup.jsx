import { useState } from 'react';
import { Wheat, Truck, Store } from 'lucide-react';
import Navbar from './Navbar';

const Signup = ({ onBackToLogin }) => {
  const [selectedRole, setSelectedRole] = useState('retailer');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Signup submitted:', { ...formData, role: selectedRole });
    // Add your signup logic here
  };

  const getRoleWelcome = () => {
    const role = roles.find(r => r.id === selectedRole);
    return {
      title: `Join as ${role?.name}`,
      description: `Create your ${selectedRole} account and start managing your agricultural business`,
      icon: role?.icon
    };
  };

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
              <p className="text-xs text-gray-500">
                Friday, 19 September 2025
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

            {/* Signup Form */}
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                  required
                />
              </div>

              {/* Password */}
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
                  placeholder="Create a password"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                  required
                />
              </div>

              {/* Terms and Conditions */}
              <div>
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-800 focus:ring-green-500 border-gray-300 rounded mt-1"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <button type="button" className="text-green-800 hover:text-green-700 font-medium">
                      Terms and Conditions
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-green-800 hover:text-green-700 font-medium">
                      Privacy Policy
                    </button>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!formData.agreeToTerms}
                className="w-full bg-green-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <span>→</span>
                <span>Create {selectedRole} account</span>
              </button>
            </div>

            {/* Back to Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-green-800 hover:text-green-700 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;