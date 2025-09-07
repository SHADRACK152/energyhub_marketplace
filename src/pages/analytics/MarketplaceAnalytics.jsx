import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';

const MarketplaceAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  useEffect(() => {
    loadAnalyticsData(timeRange);
  }, [timeRange]);

  const loadAnalyticsData = (range) => {
    // Simulate analytics data
    setAnalyticsData({
      overview: {
        totalRevenue: 2500000,
        revenueGrowth: 23.5,
        totalOrders: 1247,
        orderGrowth: 18.2,
        avgOrderValue: 2005,
        aovGrowth: 8.7,
        customerAcquisition: 89,
        caGrowth: 12.3
      },
      salesTrends: [
        { date: '2024-12-01', revenue: 45000, orders: 23, b2b: 35000, b2c: 10000 },
        { date: '2024-12-02', revenue: 52000, orders: 28, b2b: 40000, b2c: 12000 },
        { date: '2024-12-03', revenue: 48000, orders: 25, b2b: 36000, b2c: 12000 },
        { date: '2024-12-04', revenue: 65000, orders: 32, b2b: 50000, b2c: 15000 },
        { date: '2024-12-05', revenue: 58000, orders: 29, b2b: 43000, b2c: 15000 },
        { date: '2024-12-06', revenue: 72000, orders: 35, b2b: 55000, b2c: 17000 },
        { date: '2024-12-07', revenue: 68000, orders: 33, b2b: 51000, b2c: 17000 }
      ],
      topProducts: [
        { name: 'Tesla Powerwall', revenue: 450000, units: 36, growth: 25.3 },
        { name: 'LG Solar Panels', revenue: 320000, units: 1142, growth: 18.7 },
        { name: 'SolarEdge Inverters', revenue: 280000, units: 175, growth: 22.1 },
        { name: 'Enphase Microinverters', revenue: 195000, units: 557, growth: 15.8 },
        { name: 'Complete Solar Systems', revenue: 890000, units: 31, growth: 35.2 }
      ],
      customerSegments: [
        { segment: 'B2B Large Enterprise', revenue: 1200000, customers: 45, avgOrder: 26667 },
        { segment: 'B2B SMB', revenue: 650000, customers: 123, avgOrder: 5285 },
        { segment: 'B2C Residential', revenue: 450000, customers: 289, avgOrder: 1557 },
        { segment: 'B2C Commercial', revenue: 200000, customers: 67, avgOrder: 2985 }
      ],
      geographicData: [
        { state: 'California', revenue: 890000, orders: 445, growth: 28.5 },
        { state: 'Texas', revenue: 520000, orders: 267, growth: 22.1 },
        { state: 'Florida', revenue: 380000, orders: 198, growth: 19.8 },
        { state: 'New York', revenue: 295000, orders: 142, growth: 15.2 },
        { state: 'Arizona', revenue: 240000, orders: 125, growth: 31.7 }
      ],
      supplierPerformance: [
        { supplier: 'Tesla Energy', revenue: 650000, orders: 78, rating: 4.8, fulfillmentRate: 98.5 },
        { supplier: 'LG Energy', revenue: 480000, orders: 156, rating: 4.7, fulfillmentRate: 96.2 },
        { supplier: 'SolarEdge', revenue: 420000, orders: 134, rating: 4.6, fulfillmentRate: 97.8 },
        { supplier: 'Enphase', revenue: 290000, orders: 89, rating: 4.5, fulfillmentRate: 95.1 }
      ],
      marketTrends: {
        energyStorageGrowth: 45.2,
        solarAdoptionRate: 23.8,
        evChargingDemand: 67.5,
        smartDeviceIntegration: 34.1
      },
      predictions: {
        nextMonthRevenue: 2875000,
        quarterlyGrowth: 28.5,
        topGrowthCategory: 'Energy Storage',
        riskFactors: ['Supply chain delays', 'Seasonal demand variation']
      }
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketplace Analytics</h1>
            <p className="text-gray-600">Advanced insights and business intelligence</p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <Button>Export Report</Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(analyticsData.overview?.totalRevenue)}
                </p>
                <p className={`text-sm ${analyticsData.overview?.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(analyticsData.overview?.revenueGrowth)} vs last period
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">
                  {analyticsData.overview?.totalOrders?.toLocaleString()}
                </p>
                <p className={`text-sm ${analyticsData.overview?.orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(analyticsData.overview?.orderGrowth)} vs last period
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(analyticsData.overview?.avgOrderValue)}
                </p>
                <p className={`text-sm ${analyticsData.overview?.aovGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(analyticsData.overview?.aovGrowth)} vs last period
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">💳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Customers</p>
                <p className="text-3xl font-bold text-gray-900">
                  {analyticsData.overview?.customerAcquisition}
                </p>
                <p className={`text-sm ${analyticsData.overview?.caGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(analyticsData.overview?.caGrowth)} vs last period
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-xl">👥</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Trends Chart */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold">Sales Trends</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analyticsData.salesTrends?.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{new Date(day.date).toLocaleDateString()}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">{formatCurrency(day.revenue)}</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${(day.revenue / 80000) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold">Top Performing Products</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analyticsData.topProducts?.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.units} units sold</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(product.revenue)}</div>
                      <div className="text-sm text-green-600">{formatPercentage(product.growth)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Segments */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold">Customer Segments</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analyticsData.customerSegments?.map((segment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{segment.segment}</span>
                      <span className="text-sm">{formatCurrency(segment.revenue)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {segment.customers} customers • Avg: {formatCurrency(segment.avgOrder)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Geographic Performance */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold">Geographic Performance</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analyticsData.geographicData?.map((state, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{state.state}</span>
                      <span className="text-sm text-green-600">{formatPercentage(state.growth)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatCurrency(state.revenue)} • {state.orders} orders
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold">Market Trends</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Energy Storage Growth</span>
                    <span className="font-medium text-green-600">
                      {formatPercentage(analyticsData.marketTrends?.energyStorageGrowth)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Solar Adoption Rate</span>
                    <span className="font-medium text-blue-600">
                      {formatPercentage(analyticsData.marketTrends?.solarAdoptionRate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>EV Charging Demand</span>
                    <span className="font-medium text-purple-600">
                      {formatPercentage(analyticsData.marketTrends?.evChargingDemand)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Smart Device Integration</span>
                    <span className="font-medium text-orange-600">
                      {formatPercentage(analyticsData.marketTrends?.smartDeviceIntegration)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Predictions */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border">
          <h3 className="text-lg font-bold mb-4">🤖 AI-Powered Predictions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600">Next Month Revenue</div>
              <div className="text-xl font-bold text-blue-600">
                {formatCurrency(analyticsData.predictions?.nextMonthRevenue)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Quarterly Growth</div>
              <div className="text-xl font-bold text-green-600">
                {formatPercentage(analyticsData.predictions?.quarterlyGrowth)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Growth Leader</div>
              <div className="text-xl font-bold text-purple-600">
                {analyticsData.predictions?.topGrowthCategory}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Risk Factors</div>
              <div className="text-sm text-orange-600">
                {analyticsData.predictions?.riskFactors?.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceAnalytics;
