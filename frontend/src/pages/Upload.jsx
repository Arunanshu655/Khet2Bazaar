// Upload.jsx
import { useState, useEffect } from 'react';
import { Wheat, Truck, Store, Upload as UploadIcon, Camera, Calendar, User, FileText, Package, DollarSign, MapPin, Clock, Award, Info } from 'lucide-react';
import Navbar from './Navbar';

const Upload = () => {
  const [userRole, setUserRole] = useState('farmer'); // This would come from your auth context
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [availableBatches, setAvailableBatches] = useState([
    {
      id: 1,
      farmerName: "Rajesh Kumar Sharma",
      farmerId: "F001",
      cropName: "Organic Wheat",
      category: "grains",
      capacity: "500",
      pricePerKg: "45",
      date: "2025-01-15",
      batchNo: "WH-2025-001",
      certifications: "Organic Certification",
      photo: null,
      distributorInfo: {
        transportCost: "2500",
        margin: "10",
        vehicle: "truck",
        vehicleNo: "RJ-14-AB-1234",
        date: "2025-01-16"
      }
    }
  ]);

  const [formData, setFormData] = useState({
    // Farmer fields
    cropName: '',
    capacity: '',
    pricePerKg: '',
    date: '',
    farmerId: '',
    batchNo: '',
    certifications: '',
    category: 'fruits',
    photo: null,
    
    // Distributor fields
    transportCost: '',
    distributorMargin: '',
    vehicle: 'truck',
    vehicleNo: '',
    distributorDate: '',
    
    // Retailer fields
    shopNo: '',
    retailerCost: '',
    retailerMargin: '',
    retailerDate: ''
  });

  const categories = [
    { value: 'fruits', label: 'Fruits', icon: '🍎' },
    { value: 'vegetables', label: 'Vegetables', icon: '🥕' },
    { value: 'grains', label: 'Grains', icon: '🌾' },
    { value: 'dairy', label: 'Dairy Products', icon: '🥛' },
    { value: 'other', label: 'Other', icon: '📦' }
  ];

  const vehicles = [
    { value: 'truck', label: 'Truck' },
    { value: 'van', label: 'Van' },
    { value: 'pickup', label: 'Pickup Truck' },
    { value: 'trailer', label: 'Trailer' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Upload submitted:', { ...formData, role: userRole, selectedBatch });
    // Add your upload logic here
  };

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
    // Pre-fill form with existing data for distributors/retailers
    if (userRole === 'distributor' || userRole === 'retailer') {
      setFormData(prev => ({
        ...prev,
        cropName: batch.cropName,
        capacity: batch.capacity,
        pricePerKg: batch.pricePerKg,
        date: batch.date,
        farmerId: batch.farmerId,
        batchNo: batch.batchNo,
        certifications: batch.certifications,
        category: batch.category
      }));
    }
  };

  const getRoleInfo = () => {
    switch (userRole) {
      case 'farmer':
        return {
          title: 'Upload Crop Batch',
          description: 'Add your harvested crop details to the marketplace',
          icon: Wheat,
          color: 'green'
        };
      case 'distributor':
        return {
          title: 'Process Batch',
          description: 'Add transportation and distribution details',
          icon: Truck,
          color: 'blue'
        };
      case 'retailer':
        return {
          title: 'Retail Processing',
          description: 'Add retail pricing and shop information',
          icon: Store,
          color: 'purple'
        };
      default:
        return {
          title: 'Upload',
          description: 'Upload your details',
          icon: UploadIcon,
          color: 'green'
        };
    }
  };

  const roleInfo = getRoleInfo();
  const RoleIcon = roleInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center min-h-screen py-12 px-4 pt-24">
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
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
                <RoleIcon className="w-5 h-5 text-green-800" />
                <h3 className="text-lg font-semibold text-gray-900">{roleInfo.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                {roleInfo.description}
              </p>
            </div>

            {/* Role Selector (for demo purposes) */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-gray-700 mb-4 text-center">
                Current Role
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {['farmer', 'distributor', 'retailer'].map((role) => {
                  const roleIcons = { farmer: Wheat, distributor: Truck, retailer: Store };
                  const RoleIconComponent = roleIcons[role];
                  const isSelected = userRole === role;
                  
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setUserRole(role)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                        isSelected
                          ? 'border-green-800 bg-green-800 text-white'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      <div className="flex justify-center mb-2">
                        <RoleIconComponent className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium capitalize">
                        {role}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Batch Selection for Distributors and Retailers */}
            {(userRole === 'distributor' || userRole === 'retailer') && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Batch to Process
                </h4>
                <div className="space-y-3">
                  {availableBatches.map((batch) => (
                    <div
                      key={batch.id}
                      onClick={() => handleBatchSelect(batch)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedBatch?.id === batch.id
                          ? 'border-green-800 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-semibold text-gray-900">{batch.cropName}</h5>
                          <p className="text-sm text-gray-600">Farmer: {batch.farmerName}</p>
                          <p className="text-sm text-gray-600">Batch: {batch.batchNo} | Capacity: {batch.capacity}kg</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-800">₹{batch.pricePerKg}/kg</p>
                          <p className="text-xs text-gray-500">{batch.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Form */}
            {(userRole === 'farmer' || selectedBatch) && (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Farmer's Upload Section */}
                {userRole === 'farmer' && (
                  <>
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Package className="w-5 h-5 mr-2 text-green-800" />
                        Crop Information
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Photo Upload */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Crop Photo <span className="text-red-500">*</span>
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-800 transition-colors">
                            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <input
                              type="file"
                              name="photo"
                              accept="image/*"
                              onChange={handleInputChange}
                              className="hidden"
                              id="photo-upload"
                            />
                            <label htmlFor="photo-upload" className="cursor-pointer">
                              <span className="text-green-800 font-medium">Click to upload</span>
                              <span className="text-gray-500"> or drag and drop</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Crop Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="cropName"
                            value={formData.cropName}
                            onChange={handleInputChange}
                            placeholder="e.g., Organic Wheat"
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                            required
                          >
                            {categories.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.icon} {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Capacity (kg) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleInputChange}
                            placeholder="e.g., 500"
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price per Kg (₹) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            name="pricePerKg"
                            value={formData.pricePerKg}
                            onChange={handleInputChange}
                            placeholder="e.g., 45"
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Harvest Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Farmer ID <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="farmerId"
                            value={formData.farmerId}
                            onChange={handleInputChange}
                            placeholder="e.g., F001"
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Batch Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="batchNo"
                            value={formData.batchNo}
                            onChange={handleInputChange}
                            placeholder="e.g., WH-2025-001"
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Certifications (Optional)
                          </label>
                          <textarea
                            name="certifications"
                            value={formData.certifications}
                            onChange={handleInputChange}
                            placeholder="e.g., Organic Certification, GAP Certification"
                            rows="3"
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Display Farmer Info for Distributors/Retailers */}
                {(userRole === 'distributor' || userRole === 'retailer') && selectedBatch && (
                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-blue-600" />
                      Batch Information (Read-only)
                    </h4>
                    
                    <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Crop Name:</p>
                        <p className="text-sm text-gray-900">{selectedBatch.cropName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Farmer:</p>
                        <p className="text-sm text-gray-900">{selectedBatch.farmerName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Capacity:</p>
                        <p className="text-sm text-gray-900">{selectedBatch.capacity} kg</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Price per Kg:</p>
                        <p className="text-sm text-gray-900">₹{selectedBatch.pricePerKg}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Batch No:</p>
                        <p className="text-sm text-gray-900">{selectedBatch.batchNo}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Harvest Date:</p>
                        <p className="text-sm text-gray-900">{selectedBatch.date}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Distributor's Section */}
                {userRole === 'distributor' && selectedBatch && (
                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-blue-600" />
                      Distribution Information
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Transport Cost (₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="transportCost"
                          value={formData.transportCost}
                          onChange={handleInputChange}
                          placeholder="e.g., 2500"
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Margin (%) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="distributorMargin"
                          value={formData.distributorMargin}
                          onChange={handleInputChange}
                          placeholder="e.g., 10"
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vehicle Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="vehicle"
                          value={formData.vehicle}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                        >
                          {vehicles.map((vehicle) => (
                            <option key={vehicle.value} value={vehicle.value}>
                              {vehicle.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vehicle Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="vehicleNo"
                          value={formData.vehicleNo}
                          onChange={handleInputChange}
                          placeholder="e.g., RJ-14-AB-1234"
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Processing Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="distributorDate"
                          value={formData.distributorDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Display Distributor Info for Retailers */}
                {userRole === 'retailer' && selectedBatch?.distributorInfo && (
                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-blue-600" />
                      Distribution Information (Read-only)
                    </h4>
                    
                    <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Transport Cost:</p>
                        <p className="text-sm text-gray-900">₹{selectedBatch.distributorInfo.transportCost}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Distributor Margin:</p>
                        <p className="text-sm text-gray-900">{selectedBatch.distributorInfo.margin}%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Vehicle:</p>
                        <p className="text-sm text-gray-900 capitalize">{selectedBatch.distributorInfo.vehicle}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Vehicle No:</p>
                        <p className="text-sm text-gray-900">{selectedBatch.distributorInfo.vehicleNo}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Retailer's Section */}
                {userRole === 'retailer' && selectedBatch && (
                  <div className="pb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Store className="w-5 h-5 mr-2 text-purple-600" />
                      Retail Information
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Shop Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="shopNo"
                          value={formData.shopNo}
                          onChange={handleInputChange}
                          placeholder="e.g., Shop-A-123"
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Retail Cost (₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="retailerCost"
                          value={formData.retailerCost}
                          onChange={handleInputChange}
                          placeholder="e.g., 1500"
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Margin (%) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="retailerMargin"
                          value={formData.retailerMargin}
                          onChange={handleInputChange}
                          placeholder="e.g., 15"
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Processing Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="retailerDate"
                          value={formData.retailerDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <UploadIcon className="w-4 h-4" />
                  <span>
                    {userRole === 'farmer' ? 'Upload Crop Batch' : 
                     userRole === 'distributor' ? 'Process for Distribution' : 
                     'Process for Retail'}
                  </span>
                </button>
              </form>
            )}

            {/* Selection prompt for distributors/retailers */}
            {(userRole === 'distributor' || userRole === 'retailer') && !selectedBatch && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Please select a batch above to continue processing</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;