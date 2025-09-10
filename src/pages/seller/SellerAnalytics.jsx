import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const SellerAnalytics = () => {
  const navigate = useNavigate();

  const analyticsData = {
    totalSales: '$12,450',
    totalOrders: 156,
    averageOrderValue: '$79.80',
    conversionRate: '3.2%',
    viewsThisMonth: '2,340',
    topProduct: 'Solar Panel Kit 200W'
  };

  const recentOrders = [
    { id: '#001', product: 'Solar Panel Kit', amount: '$299', date: '2025-09-11', status: 'Completed' },
    { id: '#002', product: 'Battery Pack', amount: '$149', date: '2025-09-10', status: 'Processing' },
    { id: '#003', product: 'Inverter System', amount: '$499', date: '2025-09-09', status: 'Shipped' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-primary-foreground/80 mt-2">
            Track your performance with detailed analytics
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold text-green-600">{analyticsData.totalSales}</p>
              </div>
              <Icon name="DollarSign" size={24} className="text-green-600" />
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">{analyticsData.totalOrders}</p>
              </div>
              <Icon name="Package" size={24} className="text-blue-600" />
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold text-purple-600">{analyticsData.averageOrderValue}</p>
              </div>
              <Icon name="TrendingUp" size={24} className="text-purple-600" />
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold text-orange-600">{analyticsData.conversionRate}</p>
              </div>
              <Icon name="Target" size={24} className="text-orange-600" />
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Views This Month</p>
                <p className="text-2xl font-bold text-indigo-600">{analyticsData.viewsThisMonth}</p>
              </div>
              <Icon name="Eye" size={24} className="text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Product</p>
                <p className="text-lg font-bold">{analyticsData.topProduct}</p>
              </div>
              <Icon name="Star" size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card rounded-lg shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-border">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b border-border last:border-0">
                      <td className="py-3 font-medium">{order.id}</td>
                      <td className="py-3">{order.product}</td>
                      <td className="py-3 text-green-600 font-medium">{order.amount}</td>
                      <td className="py-3 text-muted-foreground">{order.date}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button onClick={() => navigate('/b2b-seller-dashboard')}>
            <Icon name="LayoutDashboard" size={16} className="mr-2" />
            Full Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate('/orders')}>
            <Icon name="Package" size={16} className="mr-2" />
            View All Orders
          </Button>
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerAnalytics;
