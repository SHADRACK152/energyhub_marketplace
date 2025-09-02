import React from 'react';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useState } from 'react';

// Demo orders for dashboard
const orders = [
  {
    id: 'ORD-2024-001',
    date: '2024-12-28',
    expected: '2025-01-02',
    total: 8500,
    status: 'Shipped',
    product: 'Tesla Powerwall 2 Home Battery',
    statusColor: 'primary',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-12-30',
    expected: '2025-01-05',
    total: 2100,
    status: 'Processing',
    product: 'SolarEdge SE7600H-US Inverter',
    statusColor: 'warning',
  },
  {
    id: 'ORD-2024-003',
    date: '2024-12-20',
    expected: '2024-12-25',
    total: 1899,
    status: 'Delivered',
    product: 'LG NeON R 365W Solar Panel',
    statusColor: 'success',
  },
];

const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="w-full bg-white border-b border-border shadow-sm flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Icon name="Zap" className="text-primary" size={28} />
          <span className="text-2xl font-extrabold text-primary tracking-tight">EnergyHub</span>
        </div>
        <nav className="flex gap-6 items-center">
          <a href="/b2c-buyer-dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary">Dashboard</a>
          <a href="/product-catalog-search" className="text-sm font-medium text-muted-foreground hover:text-primary">Browse</a>
          <a href="/orders" className="text-sm font-bold text-primary border-b-2 border-primary">Orders</a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-sm text-foreground">Shadrack Emadau</span>
          <Icon name="User" className="text-primary" size={24} />
          <Button variant="outline" size="sm" iconName="LogOut" iconPosition="left">Logout</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">Your Orders</h1>
          <div className="flex gap-2">
            <input type="text" placeholder="Search orders..." className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none">
              <option value="">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-4 mb-6">
          {['All', 'Processing', 'Shipped', 'Delivered'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors 
                ${tab === 'All' ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary/30 hover:bg-primary/10'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto rounded-xl shadow bg-white">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Ordered</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Expected</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-primary">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border 
                      ${order.statusColor === 'success' ? 'bg-success/10 text-success border-success/20' : ''}
                      ${order.statusColor === 'primary' ? 'bg-primary/10 text-primary border-primary/20' : ''}
                      ${order.statusColor === 'warning' ? 'bg-warning/10 text-warning border-warning/20' : ''}
                    `}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(order.expected).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-bold">${order.total.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" size="xs" iconName="Eye" iconPosition="left">View</Button>
                      {order.status === 'Delivered' && (
                        <Button variant="outline" size="xs" iconName="Repeat" iconPosition="left">Buy Again</Button>
                      )}
                      {(order.status === 'Shipped' || order.status === 'Processing') && (
                        <Button variant="outline" size="xs" iconName="Truck" iconPosition="left">Track</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
