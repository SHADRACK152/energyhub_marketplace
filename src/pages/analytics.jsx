import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/ui/AuthenticationRouter';
import RoleBasedHeader from '../components/ui/RoleBasedHeader';
import NavigationBreadcrumbs from '../components/ui/NavigationBreadcrumbs';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    revenue: {
      current: 284750,
      previous: 254200,
      change: 12.0
    },
    orders: {
      current: 156,
      previous: 142,
      change: 9.9
    },
    customers: {
      current: 89,
      previous: 76,
      change: 17.1
    },
    avgOrderValue: {
      current: 1825,
      previous: 1790,
      change: 2.0
    }
  });

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <RoleBasedHeader user={user} onNavigate={handleNavigation} />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-64 bg-muted rounded-lg"></div>
                <div className="h-64 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader user={user} onNavigate={handleNavigation} />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumbs onNavigate={handleNavigation} />
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
              <p className="text-muted-foreground mt-1">
                Track your business performance and insights
              </p>
            </div>
            
            {/* Time Range Selector */}
            <div className="flex items-center space-x-2">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-card text-foreground"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${analyticsData.revenue.current.toLocaleString()}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="DollarSign" size={20} className="text-green-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Icon name="TrendingUp" size={16} className="text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+{analyticsData.revenue.change}%</span>
                <span className="text-muted-foreground ml-2">vs last period</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-foreground">
                    {analyticsData.orders.current}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="Package" size={20} className="text-blue-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Icon name="TrendingUp" size={16} className="text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+{analyticsData.orders.change}%</span>
                <span className="text-muted-foreground ml-2">vs last period</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customers</p>
                  <p className="text-2xl font-bold text-foreground">
                    {analyticsData.customers.current}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-purple-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Icon name="TrendingUp" size={16} className="text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+{analyticsData.customers.change}%</span>
                <span className="text-muted-foreground ml-2">vs last period</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${analyticsData.avgOrderValue.current}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-orange-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Icon name="TrendingUp" size={16} className="text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+{analyticsData.avgOrderValue.change}%</span>
                <span className="text-muted-foreground ml-2">vs last period</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Icon name="BarChart" size={48} className="mx-auto mb-2" />
                  <p>Revenue chart will be implemented here</p>
                  <p className="text-sm">Integration with charting library needed</p>
                </div>
              </div>
            </div>

            {/* Orders Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Order Volume</h3>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Icon name="Activity" size={48} className="mx-auto mb-2" />
                  <p>Order volume chart will be implemented here</p>
                  <p className="text-sm">Integration with charting library needed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products Table */}
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Top Performing Products</h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sales</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Tesla Powerwall 2', sales: 45, revenue: 562500, growth: 15.2 },
                      { name: 'SolarEdge SE7600H', sales: 78, revenue: 140400, growth: 8.7 },
                      { name: 'LG NeON R 365W', sales: 234, revenue: 65520, growth: 23.1 },
                      { name: 'Enphase IQ7+', sales: 156, revenue: 54600, growth: -2.4 },
                      { name: 'Canadian Solar 400W', sales: 189, revenue: 52920, growth: 12.8 }
                    ].map((product, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-foreground">{product.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{product.sales} units</td>
                        <td className="py-3 px-4 text-muted-foreground">${product.revenue.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center text-sm font-medium ${
                            product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            <Icon 
                              name={product.growth >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                              size={16} 
                              className="mr-1" 
                            />
                            {Math.abs(product.growth)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
