// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Icon component placeholder
const Icon = ({ name, size = 16, color, className = '' }) => {
  const iconMap = {
    'Play': '▶️',
    'Pause': '⏸️',
    'RefreshCw': '🔄',
    'Clock': '🕐',
    'Activity': '📊',
    'Shield': '🛡️',
    'TrendingUp': '📈',
    'TrendingDown': '📉',
    'Minus': '➖',
    'CheckCircle': '✅',
    'AlertTriangle': '⚠️',
    'AlertCircle': '🚨',
    'Circle': '⚪',
    'Wheat': '🌾',
    'Truck': '🚛',
    'CreditCard': '💳',
    'XCircle': '❌',
    'Eye': '👁️',
    'ExternalLink': '🔗',
    'Download': '⬇️',
    'Filter': '🔽',
    'ArrowUpDown': '↕️',
    'ChevronLeft': '◀️',
    'ChevronRight': '▶️'
  };
  
  return <span className={className} style={{ fontSize: size, color }}>{iconMap[name] || '⚪'}</span>;
};

// Button component placeholder - replace with your actual Button component
const Button = ({ children, variant = 'default', size = 'md', onClick, disabled, iconName, className = '' }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };
  
  const sizeClasses = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-10 px-4 py-2',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {iconName && <Icon name={iconName} size={14} className="mr-1" />}
      {children}
    </button>
  );
};

// Input component placeholder - replace with your actual Input component
const Input = ({ type = 'text', placeholder, value, onChange, className = '' }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
};

// Select component placeholder - replace with your actual Select component
const Select = ({ options, value, onChange, placeholder, className = '' }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// AutoRefreshControl Component
const AutoRefreshControl = ({ onRefresh, className = '' }) => {
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(15);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [countdown, setCountdown] = useState(15);

  const intervalOptions = [
    { value: 5, label: '5 seconds' },
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' }
  ];

  useEffect(() => {
    let interval;
    
    if (isAutoRefresh) {
      interval = setInterval(() => {
        setLastRefresh(new Date());
        if (onRefresh) {
          onRefresh();
        }
        setCountdown(refreshInterval);
      }, refreshInterval * 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoRefresh, refreshInterval, onRefresh]);

  useEffect(() => {
    let countdownInterval;
    
    if (isAutoRefresh && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1));
      }, 1000);
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [isAutoRefresh, countdown]);

  const handleManualRefresh = () => {
    setLastRefresh(new Date());
    setCountdown(refreshInterval);
    if (onRefresh) {
      onRefresh();
    }
  };

  const toggleAutoRefresh = () => {
    setIsAutoRefresh(!isAutoRefresh);
    if (!isAutoRefresh) {
      setCountdown(refreshInterval);
    }
  };

  const handleIntervalChange = (newInterval) => {
    setRefreshInterval(parseInt(newInterval));
    setCountdown(parseInt(newInterval));
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={isAutoRefresh ? 'default' : 'outline'}
              size="sm"
              onClick={toggleAutoRefresh}
              iconName={isAutoRefresh ? 'Pause' : 'Play'}
            >
              {isAutoRefresh ? 'Auto Refresh On' : 'Auto Refresh Off'}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleManualRefresh}
              iconName="RefreshCw"
            >
              Refresh Now
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Interval:</span>
            <Select
              options={intervalOptions}
              value={refreshInterval}
              onChange={handleIntervalChange}
              className="w-32"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {isAutoRefresh && (
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} />
              <span>Next refresh in {countdown}s</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Icon name="RefreshCw" size={14} />
            <span>
              Last updated: {lastRefresh?.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
      {isAutoRefresh && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-1000 ease-linear"
              style={{ 
                width: `${((refreshInterval - countdown) / refreshInterval) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// MetricsCard Component
const MetricsCard = ({ 
  title, 
  value, 
  unit = '', 
  change, 
  changeType = 'neutral',
  icon,
  sparklineData = [],
  className = ''
}) => {
  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `${(val / 1000000)?.toFixed(1)}M`;
      } else if (val >= 1000) {
        return `${(val / 1000)?.toFixed(1)}K`;
      }
      return val?.toLocaleString();
    }
    return val;
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon name={icon} size={20} color="#2563eb" />
            </div>
          )}
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
            <Icon name={getChangeIcon(changeType)} size={14} />
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-bold text-gray-900">{formatValue(value)}</span>
          {unit && <span className="text-sm text-gray-500">{unit}</span>}
        </div>

        {sparklineData?.length > 0 && (
          <div className="h-8 flex items-end space-x-1">
            {sparklineData?.slice(-12)?.map((point, index) => (
              <div
                key={index}
                className="bg-blue-200 rounded-sm flex-1"
                style={{
                  height: `${Math.max((point / Math.max(...sparklineData)) * 100, 10)}%`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// NetworkStatusCard Component
const NetworkStatusCard = ({ 
  status = 'healthy', 
  blockHeight = 2847392, 
  lastBlockTime = '12s ago',
  networkHashRate = '847.3 TH/s',
  connectedNodes = 1247
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'critical':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-500 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Network Status</h3>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(status)}`}>
          <Icon name={getStatusIcon(status)} size={14} />
          <span className="text-sm font-medium capitalize">{status}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Block Height</p>
          <p className="text-xl font-bold text-gray-900">{blockHeight?.toLocaleString()}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Last Block</p>
          <p className="text-xl font-bold text-gray-900">{lastBlockTime}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Hash Rate</p>
          <p className="text-lg font-semibold text-gray-900">{networkHashRate}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Connected Nodes</p>
          <p className="text-lg font-semibold text-gray-900">{connectedNodes?.toLocaleString()}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Network Sync</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 font-medium">Synchronized</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// LiveTransactionFeed Component
const LiveTransactionFeed = () => {
  const [transactions, setTransactions] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const mockTransactions = [
    {
      id: '0x7f9a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b',
      type: 'harvest',
      stakeholder: 'Green Valley Farms',
      product: 'Organic Tomatoes',
      status: 'confirmed',
      timestamp: new Date(Date.now() - 30000),
      blockNumber: 2847392,
      gasUsed: 21000,
      value: '2.5 ETH'
    },
    {
      id: '0x8a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
      type: 'transfer',
      stakeholder: 'Fresh Logistics Co.',
      product: 'Mixed Vegetables',
      status: 'pending',
      timestamp: new Date(Date.now() - 45000),
      blockNumber: null,
      gasUsed: null,
      value: '1.8 ETH'
    },
    {
      id: '0x9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
      type: 'quality',
      stakeholder: 'Quality Assurance Ltd.',
      product: 'Organic Apples',
      status: 'confirmed',
      timestamp: new Date(Date.now() - 120000),
      blockNumber: 2847391,
      gasUsed: 18500,
      value: '0.3 ETH'
    }
  ];

  useEffect(() => {
    setTransactions(mockTransactions);
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const newTransaction = {
        id: `0x${Math.random()?.toString(16)?.substr(2, 64)}`,
        type: ['harvest', 'transfer', 'quality', 'payment']?.[Math.floor(Math.random() * 4)],
        stakeholder: ['Green Valley Farms', 'Fresh Logistics Co.', 'Quality Assurance Ltd.', 'Metro Supermarket']?.[Math.floor(Math.random() * 4)],
        product: ['Organic Tomatoes', 'Mixed Vegetables', 'Organic Apples', 'Fresh Produce Bundle']?.[Math.floor(Math.random() * 4)],
        status: Math.random() > 0.8 ? 'pending' : 'confirmed',
        timestamp: new Date(),
        blockNumber: Math.random() > 0.8 ? null : 2847393 + Math.floor(Math.random() * 10),
        gasUsed: Math.random() > 0.8 ? null : 18000 + Math.floor(Math.random() * 10000),
        value: `${(Math.random() * 5 + 0.1)?.toFixed(1)} ETH`
      };

      setTransactions(prev => [newTransaction, ...prev?.slice(0, 19)]);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'failed':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-500 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'harvest':
        return 'Wheat';
      case 'transfer':
        return 'Truck';
      case 'quality':
        return 'Shield';
      case 'payment':
        return 'CreditCard';
      default:
        return 'Circle';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'harvest':
        return 'text-blue-600';
      case 'transfer':
        return 'text-purple-600';
      case 'quality':
        return 'text-yellow-600';
      case 'payment':
        return 'text-green-600';
      default:
        return 'text-gray-500';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ago`;
    }
    return `${seconds}s ago`;
  };

  const truncateHash = (hash) => {
    return `${hash?.slice(0, 8)}...${hash?.slice(-6)}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Live Transaction Feed</h3>
            <p className="text-sm text-gray-500">Real-time blockchain activity</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-2 px-2 py-1 rounded-full ${
              isConnected ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`} />
              <span className="text-xs font-medium">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={autoRefresh ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              iconName={autoRefresh ? 'Pause' : 'Play'}
            >
              {autoRefresh ? 'Pause' : 'Resume'}
            </Button>
            
            <Button variant="ghost" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>

          <span className="text-sm text-gray-500">
            {transactions?.length} transactions
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {transactions?.map((transaction) => (
            <div
              key={transaction?.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100 ${getTypeColor(transaction?.type)}`}>
                    <Icon name={getTypeIcon(transaction?.type)} size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {transaction?.stakeholder}
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction?.product}
                    </p>
                  </div>
                </div>

                <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(transaction?.status)}`}>
                  {transaction?.status}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Hash:</span>
                  <span className="font-mono text-gray-900">
                    {truncateHash(transaction?.id)}
                  </span>
                </div>

                {transaction?.blockNumber && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Block:</span>
                    <span className="text-gray-900">
                      #{transaction?.blockNumber?.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Value:</span>
                  <span className="text-gray-900 font-medium">
                    {transaction?.value}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Time:</span>
                  <span className="text-gray-900">
                    {formatTimestamp(transaction?.timestamp)}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center"
                  iconName="ExternalLink"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// TransactionVolumeChart Component
const TransactionVolumeChart = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const chartData = [
    { time: '00:00', volume: 1240, verificationRate: 98.5, pending: 45 },
    { time: '02:00', volume: 980, verificationRate: 97.8, pending: 62 },
    { time: '04:00', volume: 750, verificationRate: 99.1, pending: 28 },
    { time: '06:00', volume: 1100, verificationRate: 98.9, pending: 35 },
    { time: '08:00', volume: 1850, verificationRate: 97.2, pending: 89 },
    { time: '10:00', volume: 2100, verificationRate: 98.7, pending: 52 },
    { time: '12:00', volume: 2350, verificationRate: 99.3, pending: 31 },
    { time: '14:00', volume: 2180, verificationRate: 98.1, pending: 67 },
    { time: '16:00', volume: 1950, verificationRate: 97.9, pending: 74 },
    { time: '18:00', volume: 1720, verificationRate: 98.6, pending: 43 },
    { time: '20:00', volume: 1450, verificationRate: 99.0, pending: 38 },
    { time: '22:00', volume: 1280, verificationRate: 98.4, pending: 56 }
  ];

  const timeRanges = [
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey === 'volume' ? 'Volume' : 
                 entry?.dataKey === 'verificationRate' ? 'Verification Rate' : 'Pending'}: ${
                entry?.dataKey === 'verificationRate' ? `${entry?.value}%` : 
                entry?.value?.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Transaction Volume & Verification</h3>
          <p className="text-sm text-gray-500">Real-time blockchain transaction analytics</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Time Range:</span>
            <div className="flex space-x-1">
              {timeRanges?.map((range) => (
                <Button
                  key={range?.id}
                  variant={timeRange === range?.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTimeRange(range?.id)}
                >
                  {range?.label}
                </Button>
              ))}
            </div>
          </div>

          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="volume" 
              fill="#2563eb" 
              name="Transaction Volume"
              radius={[2, 2, 0, 0]}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="verificationRate" 
              stroke="#7c3aed" 
              strokeWidth={3}
              name="Verification Rate (%)"
              dot={{ fill: '#7c3aed', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {chartData?.reduce((sum, item) => sum + item?.volume, 0)?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Total Volume</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {(chartData?.reduce((sum, item) => sum + item?.verificationRate, 0) / chartData?.length)?.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500">Avg Verification Rate</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">
              {chartData?.[chartData?.length - 1]?.pending || 0}
            </p>
            <p className="text-sm text-gray-500">Currently Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// TransactionHistoryTable Component
const TransactionHistoryTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');

  const mockTransactions = [
    {
      id: '0x7f9a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b',
      hash: '0x7f9a2b8c...9f0a1b',
      type: 'harvest',
      stakeholder: 'Green Valley Farms',
      product: 'Organic Tomatoes',
      status: 'confirmed',
      timestamp: new Date('2025-01-18T14:30:00'),
      blockNumber: 2847392,
      gasUsed: 21000,
      gasPrice: '20 Gwei',
      value: '2.5 ETH',
      verificationBadge: 'verified'
    },
    {
      id: '0x8a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
      hash: '0x8a0b1c2d...9a0b1c',
      type: 'transfer',
      stakeholder: 'Fresh Logistics Co.',
      product: 'Mixed Vegetables',
      status: 'pending',
      timestamp: new Date('2025-01-18T14:15:00'),
      blockNumber: null,
      gasUsed: null,
      gasPrice: '22 Gwei',
      value: '1.8 ETH',
      verificationBadge: 'pending'
    },
    {
      id: '0x9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
      hash: '0x9b1c2d3e...1c2d',
      type: 'quality',
      stakeholder: 'Quality Assurance Ltd.',
      product: 'Organic Apples',
      status: 'confirmed',
      timestamp: new Date('2025-01-18T13:45:00'),
      blockNumber: 2847391,
      gasUsed: 18500,
      gasPrice: '19 Gwei',
      value: '0.3 ETH',
      verificationBadge: 'verified'
    },
    {
      id: '0xac2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e',
      hash: '0xac2d3e4f...c2d3e',
      type: 'payment',
      stakeholder: 'Metro Supermarket',
      product: 'Fresh Produce Bundle',
      status: 'failed',
      timestamp: new Date('2025-01-18T13:20:00'),
      blockNumber: null,
      gasUsed: null,
      gasPrice: '25 Gwei',
      value: '5.2 ETH',
      verificationBadge: 'failed'
    },
    {
      id: '0xbd3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
      hash: '0xbd3e4f5a...d3e4f',
      type: 'harvest',
      stakeholder: 'Sunrise Organic Farm',
      product: 'Leafy Greens',
      status: 'confirmed',
      timestamp: new Date('2025-01-18T12:55:00'),
      blockNumber: 2847390,
      gasUsed: 22000,
      gasPrice: '18 Gwei',
      value: '1.9 ETH',
      verificationBadge: 'verified'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'harvest', label: 'Harvest' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'quality', label: 'Quality Check' },
    { value: 'payment', label: 'Payment' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'failed':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-500 bg-gray-100 border-gray-200';
    }
  };

  const getVerificationBadge = (badge) => {
    switch (badge) {
      case 'verified':
        return (
          <div className="flex items-center space-x-1 text-green-600">
            <Icon name="CheckCircle" size={14} />
            <span className="text-xs font-medium">Verified</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center space-x-1 text-yellow-600">
            <Icon name="Clock" size={14} />
            <span className="text-xs font-medium">Pending</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center space-x-1 text-red-600">
            <Icon name="XCircle" size={14} />
            <span className="text-xs font-medium">Failed</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'harvest':
        return 'Wheat';
      case 'transfer':
        return 'Truck';
      case 'quality':
        return 'Shield';
      case 'payment':
        return 'CreditCard';
      default:
        return 'Circle';
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredTransactions = mockTransactions?.filter(transaction => {
    const matchesSearch = transaction?.hash?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         transaction?.stakeholder?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         transaction?.product?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction?.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction?.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTransactions?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
            <p className="text-sm text-gray-500">Complete blockchain transaction records</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="outline" size="sm" iconName="Filter">
              Advanced Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search by hash, stakeholder, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="md:col-span-1"
          />
          
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
          
          <Select
            options={typeOptions}
            value={typeFilter}
            onChange={setTypeFilter}
            placeholder="Filter by type"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">
                <button
                  onClick={() => handleSort('hash')}
                  className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
                >
                  <span>Transaction</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-gray-500">
                <button
                  onClick={() => handleSort('type')}
                  className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
                >
                  <span>Type</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-gray-500">Stakeholder</th>
              <th className="text-left p-4 font-medium text-gray-500">Product</th>
              <th className="text-left p-4 font-medium text-gray-500">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-gray-500">Verification</th>
              <th className="text-left p-4 font-medium text-gray-500">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
                >
                  <span>Time</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-gray-500">Value</th>
              <th className="text-left p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions?.map((transaction) => (
              <tr key={transaction?.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="font-mono text-sm text-gray-900">{transaction?.hash}</p>
                    {transaction?.blockNumber && (
                      <p className="text-xs text-gray-500">
                        Block #{transaction?.blockNumber?.toLocaleString()}
                      </p>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={getTypeIcon(transaction?.type)} size={16} className="text-blue-600" />
                    <span className="text-sm text-gray-900 capitalize">{transaction?.type}</span>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm font-medium text-gray-900">{transaction?.stakeholder}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-900">{transaction?.product}</p>
                </td>
                <td className="p-4">
                  <div className={`inline-flex px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(transaction?.status)}`}>
                    {transaction?.status}
                  </div>
                </td>
                <td className="p-4">
                  {getVerificationBadge(transaction?.verificationBadge)}
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-900">
                      {transaction?.timestamp?.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction?.timestamp?.toLocaleTimeString()}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm font-medium text-gray-900">{transaction?.value}</p>
                  {transaction?.gasPrice && (
                    <p className="text-xs text-gray-500">{transaction?.gasPrice}</p>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" iconName="ExternalLink">
                      Explorer
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransactions?.length)} of {filteredTransactions?.length} transactions
            </p>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);

  const handleRefresh = () => {
    console.log('Refreshing blockchain data...');
    // Simulate data refresh
  };

  // Mock metrics data with sparklines
  const metricsData = [
    {
      title: 'Transaction Volume (24h)',
      value: 18750,
      unit: 'txns',
      change: 12.5,
      changeType: 'positive',
      icon: 'Activity',
      sparklineData: [1200, 1350, 1100, 1450, 1600, 1750, 1850, 1950, 1800, 1700, 1650, 1875]
    },
    {
      title: 'Verification Success Rate',
      value: 98.7,
      unit: '%',
      change: 0.3,
      changeType: 'positive',
      icon: 'Shield',
      sparklineData: [97.8, 98.1, 97.9, 98.3, 98.5, 98.7, 98.9, 98.4, 98.6, 98.8, 98.5, 98.7]
    },
    {
      title: 'Average Block Time',
      value: 12.4,
      unit: 'sec',
      change: -5.2,
      changeType: 'positive',
      icon: 'Clock',
      sparklineData: [13.2, 12.8, 13.1, 12.9, 12.6, 12.4, 12.3, 12.5, 12.4, 12.2, 12.3, 12.4]
    },
    {
      title: 'Network Health Score',
      value: 94.2,
      unit: '/100',
      change: 2.1,
      changeType: 'positive',
      icon: 'TrendingUp',
      sparklineData: [92.1, 92.8, 93.2, 93.5, 93.8, 94.0, 94.2, 93.9, 94.1, 94.3, 94.0, 94.2]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K2B</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Khet2Bazaar</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Dashboard</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Analytics</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Settings</a>
            </nav>
          </div>
        </div>
      </header> */}

      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blockchain Transaction Monitoring</h1>
              <p className="text-gray-500 mt-1">
                Real-time blockchain network performance and verification analytics
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {new Date()?.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Auto Refresh Control */}
          <AutoRefreshControl onRefresh={handleRefresh} />

          {/* Network Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <NetworkStatusCard />
            </div>
            <div className="lg:col-span-2">
              {/* Primary Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metricsData?.map((metric, index) => (
                  <MetricsCard
                    key={index}
                    title={metric?.title}
                    value={metric?.value}
                    unit={metric?.unit}
                    change={metric?.change}
                    changeType={metric?.changeType}
                    icon={metric?.icon}
                    sparklineData={metric?.sparklineData}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Transaction Volume Chart */}
            <div className="xl:col-span-2">
              <TransactionVolumeChart />
            </div>

            {/* Live Transaction Feed */}
            <div className="xl:col-span-1">
              <LiveTransactionFeed />
            </div>
          </div>

          {/* Transaction History Table */}
          <div>
            <TransactionHistoryTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;