import React from 'react';
import RoleBasedHeader from '../components/ui/RoleBasedHeader';
import { useAuth } from '../components/ui/AuthenticationRouter';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Image from '../components/AppImage';

const mockOrders = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    productName: 'Tesla Powerwall 2 Home Battery',
    productImage: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400',
    status: 'Shipped',
    orderDate: 'Dec 28, 2024',
    deliveryDate: 'Jan 2, 2025',
    price: 8500
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    productName: 'SolarEdge SE7600H-US Inverter',
    productImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
    status: 'Processing',
    orderDate: 'Dec 30, 2024',
    deliveryDate: 'Jan 5, 2025',
    price: 2100
  },
  {
    id: 3,
    orderNumber: 'ORD-2024-003',
    productName: 'LG NeON R 365W Solar Panel',
    productImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400',
    status: 'Delivered',
    orderDate: 'Dec 20, 2024',
    deliveryDate: 'Dec 25, 2024',
    price: 1899
  }
];

const statusStyles = {
  Delivered: 'bg-success/10 text-success',
  Shipped: 'bg-secondary/10 text-secondary',
  Processing: 'bg-warning/10 text-warning',
  Cancelled: 'bg-destructive/10 text-destructive',
};

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <RoleBasedHeader user={user} onNavigate={navigate} />
      <main className="pt-24 max-w-3xl mx-auto px-2 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold mb-8 text-primary drop-shadow flex items-center">
          <Icon name="Package" size={28} className="mr-2 text-primary" />
          Your Orders
        </h1>
        {mockOrders.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
            <Icon name="Inbox" size={40} className="mx-auto mb-4 text-muted-foreground/40" />
            <p className="text-lg">You have no orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map(order => (
              <div key={order.id} className="bg-white/90 border border-primary/10 rounded-2xl p-6 shadow-xl flex items-center space-x-6 animate-fade-in-up">
                <div className="w-20 h-20 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={order.productImage} alt={order.productName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-lg text-foreground truncate">{order.productName}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status] || 'bg-muted text-muted-foreground'}`}>{order.status}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <span className="mr-4">Order #{order.orderNumber}</span>
                    <span className="mr-4">Ordered: {order.orderDate}</span>
                    <span>Expected: {order.deliveryDate}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-primary font-bold text-lg">${order.price.toLocaleString()}</span>
                    <button className="text-sm text-primary hover:underline font-medium" onClick={() => navigate('/product-detail-page/' + order.id)}>View Details</button>
                    {order.status !== 'Delivered' && (
                      <button className="text-sm text-secondary hover:underline font-medium">Track</button>
                    )}
                    {order.status === 'Delivered' && (
                      <button className="text-sm text-success hover:underline font-medium">Buy Again</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
