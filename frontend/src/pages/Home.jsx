import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: ''
  });

  const roleConfig = {
    farmer: {
      namePlaceholder: "Enter your full name",
      locationPlaceholder: "Enter your farm location",
      icon: "🌾",
      gradient: "from-green-500 to-green-600",
      description: "Sell your produce directly to consumers with fair pricing and complete transparency. Build trust through community validation and get access to credit facilities."
    },
    distributor: {
      namePlaceholder: "Enter company/business name",
      locationPlaceholder: "Enter your operating area",
      icon: "🚛",
      gradient: "from-orange-500 to-orange-600",
      description: "Manage transparent supply chain operations with automated pricing and quality tracking. Build efficient distribution networks with verified suppliers."
    },
    retailer: {
      namePlaceholder: "Enter store/business name",
      locationPlaceholder: "Enter your store location",
      icon: "🏪",
      gradient: "from-blue-500 to-blue-600",
      description: "Purchase high-quality agricultural products with complete traceability. Offer customers transparency and build trust through verified supply chains."
    },
    consumer: {
      namePlaceholder: "Enter your full name",
      locationPlaceholder: "Enter your city",
      icon: "👨‍👩‍👧‍👦",
      gradient: "from-purple-500 to-purple-600",
      description: "Know exactly where your food comes from, who grew it, and how it reached your plate. Support fair trade and sustainable farming practices."
    }
  };

  const features = [
    {
      icon: "🔗",
      title: "Blockchain Transparency",
      description: "Every transaction is recorded on an immutable blockchain, ensuring complete transparency from Khet to Bazaar with tamper-proof records."
    },
    {
      icon: "🤝",
      title: "Community Validation",
      description: "Local farmers validate each other's produce quality and farming practices, creating a trust network without expensive IoT hardware."
    },
    {
      icon: "💰",
      title: "Fair Pricing",
      description: "Transparent price breakdown shows exactly how much each stakeholder earns, ensuring farmers get fair compensation for their hard work."
    },
    {
      icon: "📱",
      title: "Mobile-First Design",
      description: "User-friendly mobile app works on any smartphone with offline capabilities and support for multiple Indian languages."
    },
    {
      icon: "🏦",
      title: "Credit & Lending",
      description: "Blockchain-based credit scoring enables farmers to access loans based on their transaction history and community validation."
    },
    {
      icon: "🌍",
      title: "Sustainable Impact",
      description: "Support sustainable farming practices and reduce food waste through efficient supply chain management and quality tracking."
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Welcome to Khet2Bazaar! Your ${selectedRole} account has been created successfully. You will receive an SMS with login details shortly.`);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: ''
      });
      
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const RoleCard = ({ role, config, isActive, onClick }) => (
    <div
      onClick={() => onClick(role)}
      className={`
        bg-white rounded-2xl p-8 text-center border-2 transition-all duration-300 cursor-pointer
        hover:transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group
        ${isActive 
          ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg transform -translate-y-1' 
          : 'border-gray-200 hover:border-green-500'
        }
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center mx-auto mb-5 text-2xl text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
        {config.icon}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-3 capitalize">
        {role}
      </h3>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {config.description}
      </p>
    </div>
  );

  const FeatureCard = ({ feature }) => (
    <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2">
      <div className="text-5xl mb-5">{feature.icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
         <Navbar />
          {/* <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">🌾</span>
              </div>
              <span className="text-2xl font-bold text-green-800">Khet2Bazaar</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Home</a>
              <a href="#features" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-green-600 font-medium transition-colors">How It Works</a>
              <a href="#about" className="text-gray-600 hover:text-green-600 font-medium transition-colors">About</a>
            </div>
            
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:transform hover:-translate-y-0.5 transition-all duration-200">
              Connect Wallet
            </button>
          </nav> */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16" id="home">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent leading-tight">
              From Khet to Bazaar with Complete Transparency
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Revolutionary blockchain platform connecting farmers directly with consumers, 
              ensuring fair prices, quality verification, and complete supply chain transparency
            </p>
            
            <div className="flex flex-wrap justify-center gap-16 mb-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">600M+</div>
                <div className="text-gray-500 text-sm uppercase tracking-wide">Indian Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">23%</div>
                <div className="text-gray-500 text-sm uppercase tracking-wide">Current Farmer Share</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
                <div className="text-gray-500 text-sm uppercase tracking-wide">Food Waste Reduced</div>
              </div>
            </div>
          </div>
        </div>
<div className="flex justify-center">
  <button  
    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:transform hover:-translate-y-0.5 transition-all duration-200"
  >
    <Link to="/signup">
      Get Started
    </Link>
  </button>
</div>


      </section>

      {/* Role Selection Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-green-400 to-green-600"></div>
            
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Join the Agricultural Revolution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose your role in our transparent ecosystem and start building trust in the food supply chain
              </p>
            </div>

            {/* Role Cards */}
            <div className="grid grid-cols-6 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
              {Object.entries(roleConfig).map(([role, config]) => (
                <RoleCard
                  key={role}
                  role={role}
                  config={config}
                  isActive={selectedRole === role}
                  onClick={setSelectedRole}
                />
              ))}
            </div>

            {/* Registration Form */}
            {/* <div className="max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-10 rounded-2xl shadow-lg">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={roleConfig[selectedRole].namePlaceholder}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder={roleConfig[selectedRole].locationPlaceholder}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    />
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg hover:transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <span>Start Your Khet2Bazaar Journey</span>
                    )}
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-green-100 to-green-200" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Khet2Bazaar?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technology meets traditional agriculture to create a transparent, efficient, and fair marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-300">Khet2Bazaar</h3>
              <p className="text-gray-300 leading-relaxed">
                Revolutionizing agriculture through blockchain technology and community-driven transparency.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-300">Quick Links</h3>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-300 hover:text-green-300 transition-colors">Home</a>
                <a href="#features" className="block text-gray-300 hover:text-green-300 transition-colors">Features</a>
                <a href="#how-it-works" className="block text-gray-300 hover:text-green-300 transition-colors">How It Works</a>
                <a href="#about" className="block text-gray-300 hover:text-green-300 transition-colors">About Us</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-300">Support</h3>
              <div className="space-y-2">
                <a href="#help" className="block text-gray-300 hover:text-green-300 transition-colors">Help Center</a>
                <a href="#contact" className="block text-gray-300 hover:text-green-300 transition-colors">Contact Us</a>
                <a href="#faq" className="block text-gray-300 hover:text-green-300 transition-colors">FAQ</a>
                <a href="#community" className="block text-gray-300 hover:text-green-300 transition-colors">Community</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-300">Legal</h3>
              <div className="space-y-2">
                <a href="#privacy" className="block text-gray-300 hover:text-green-300 transition-colors">Privacy Policy</a>
                <a href="#terms" className="block text-gray-300 hover:text-green-300 transition-colors">Terms of Service</a>
                <a href="#security" className="block text-gray-300 hover:text-green-300 transition-colors">Security</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-700 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 Khet2Bazaar. Empowering farmers, connecting communities, building trust.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;