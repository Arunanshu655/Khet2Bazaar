import { useState } from 'react';
import { 
  User, MapPin, Calendar, Phone, Mail, Building, CheckCircle, 
  AlertCircle, Clock, Share, Edit, Plus, FileText, Download, 
  Shield, Settings, ArrowRight, Eye, Star, Award, Verified
} from 'lucide-react';
import Navbar from './Navbar';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock user data
  const userData = {
    name: "Rajesh Kumar Sharma",
    role: "Farmer",
    verified: true,
    location: "Jaipur, Rajasthan, India",
    joinedDate: "March 2023",
    profileViews: "1247 views",
    avatar: "/api/placeholder/120/120",
    profileCompletion: 85,
    documentsVerified: "3/4",
    certifications: 5,
    profileRating: 4.8,
    personalInfo: {
      fullName: "Rajesh Kumar Sharma",
      email: "rajesh.sharma@email.com",
      phone: "+91 98765 43210",
      dateOfBirth: "15th March 1985",
      gender: "Male",
      address: "Village Khetri, Tehsil Chomu, Jaipur, Rajasthan - 303702"
    },
    farmInfo: {
      businessName: "Sharma Organic Farms",
      registrationNumber: "RJ-FARM-2023-001234",
      experience: "12 years",
      specialization: "Organic Wheat & Mustard",
      businessSize: "Medium Scale (26 acres)",
      operatingSince: "2012"
    }
  };

  const verificationItems = [
    {
      id: 1,
      title: "Aadhaar Card",
      description: "Government issued identity verification",
      status: "verified",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "DigiLocker",
      description: "Digital document storage and verification",
      status: "verified",
      lastUpdated: "2024-01-20"
    },
    {
      id: 3,
      title: "Business License",
      description: "Business registration and licensing",
      status: "pending",
      lastUpdated: "2024-01-18"
    },
    {
      id: 4,
      title: "Bank Account",
      description: "Financial account verification",
      status: "verified",
      lastUpdated: "2024-01-16"
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "Organic Farming Certification",
      issuer: "India Organic Certification Agency",
      status: "expired",
      icon: "🌱"
    },
    {
      id: 2,
      title: "Good Agricultural Practices",
      issuer: "Ministry of Agriculture",
      status: "expired",
      icon: "🚜"
    },
    {
      id: 3,
      title: "Soil Health Management",
      issuer: "Agricultural University",
      status: "expired",
      icon: "🌾"
    },
    {
      id: 4,
      title: "Water Conservation Techniques",
      issuer: "Water Management Board",
      status: "expired",
      icon: "💧"
    },
    {
      id: 5,
      title: "Sustainable Farming Practices",
      issuer: "Green Agriculture Council",
      status: "expired",
      icon: "♻"
    }
  ];

  const quickActions = [
    { title: "Edit Profile", description: "Update your personal information", icon: Edit },
    { title: "Verify Documents", description: "Complete your verification process", icon: Shield },
    { title: "Add Certification", description: "Upload new certificates", icon: Plus },
    { title: "Share Profile", description: "Share with your network", icon: Share },
    { title: "Export PDF", description: "Download profile as PDF", icon: Download },
    { title: "Privacy Settings", description: "Manage profile visibility", icon: Settings }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-800 bg-green-50';
      case 'pending': return 'text-orange-600 bg-orange-50';
      case 'expired': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'pending': return Clock;
      case 'expired': return AlertCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Tabs */}
          <div className="mb-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === 'profile' 
                    ? 'text-gray-900 border-gray-900' 
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('overview')}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === 'overview' 
                    ? 'text-gray-900 border-gray-900' 
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                Overview
              </button>
            </div>
          </div>

          {/* Main Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-green-800 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    {userData.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {userData.role}
                      </span>
                      {userData.verified && (
                        <div className="flex items-center text-green-800">
                          <Verified className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{userData.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Joined {userData.joinedDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{userData.profileViews}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-800 hover:bg-green-700">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg border p-6 text-center">
              <div className="text-2xl font-bold text-green-800 mb-2">{userData.profileCompletion}%</div>
              <div className="text-sm text-gray-600">Profile Completion</div>
            </div>
            <div className="bg-white rounded-lg border p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{userData.documentsVerified}</div>
              <div className="text-sm text-gray-600">Documents Verified</div>
            </div>
            <div className="bg-white rounded-lg border p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{userData.certifications}</div>
              <div className="text-sm text-gray-600">Certifications</div>
            </div>
            <div className="bg-white rounded-lg border p-6 text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <span className="text-2xl font-bold text-yellow-600">{userData.profileRating}</span>
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg text-gray-400">/5</span>
              </div>
              <div className="text-sm text-gray-600">Profile Rating</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Your basic personal details</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Full Name</span>
                    </div>
                    <p className="text-sm text-gray-900">{userData.personalInfo.fullName}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Email</span>
                    </div>
                    <p className="text-sm text-gray-900">{userData.personalInfo.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Phone</span>
                    </div>
                    <p className="text-sm text-gray-900">{userData.personalInfo.phone}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Date of Birth</span>
                    </div>
                    <p className="text-sm text-gray-900">{userData.personalInfo.dateOfBirth}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Gender</span>
                    </div>
                    <p className="text-sm text-gray-900">{userData.personalInfo.gender}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Address</span>
                  </div>
                  <p className="text-sm text-gray-900">{userData.personalInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Farm Information */}
            <div className="bg-white rounded-lg border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Farm Information</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Your farming operations and crop details</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Business Name</span>
                    </div>
                    <p className="text-sm text-gray-900">{userData.farmInfo.businessName}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Registration Number</span>
                    </div>
                    <p className="text-sm text-gray-900">{userData.farmInfo.registrationNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Experience</span>
                    </div>
                    <p className="text-sm text-gray-900">{userData.farmInfo.experience}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Specialization</span>
                    </div>
                    <p className="text-sm text-gray-900">{userData.farmInfo.specialization}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Business Size</span>
                    </div>
                    <p className="text-sm text-gray-900">{userData.farmInfo.businessSize}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Operating Since</span>
                    </div>
                    <p className="text-sm text-gray-900">{userData.farmInfo.operatingSince}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-white rounded-lg border mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Verification Status</h3>
                </div>
                <button className="text-green-800 hover:text-green-700 text-sm font-medium">
                  Verify All
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">Document and identity verification</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {verificationItems.map((item) => {
                  const StatusIcon = getStatusIcon(item.status);
                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <p className="text-xs text-gray-500">Last updated: {item.lastUpdated}</p>
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {item.status === 'verified' ? 'Verified' : item.status === 'pending' ? 'Pending' : 'Expired'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Certifications & Licenses */}
          <div className="bg-white rounded-lg border mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Certifications & Licenses</h3>
                </div>
                <button className="inline-flex items-center text-green-800 hover:text-green-700 text-sm font-medium">
                  <Plus className="w-4 h-4 mr-1" />
                  Add New
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">Your professional certifications</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                        {cert.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{cert.title}</h4>
                        <p className="text-sm text-gray-600">{cert.issuer}</p>
                      </div>
                    </div>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Expired
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">Manage your profile efficiently</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action, index) => {
                  const ActionIcon = action.icon;
                  return (
                    <button
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <ActionIcon className="w-5 h-5 text-gray-400 group-hover:text-green-800" />
                        <div className="text-left">
                          <h4 className="font-medium text-gray-900">{action.title}</h4>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-800" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;