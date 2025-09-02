import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';
import Image from '../components/AppImage';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderId]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!order) return <div className="flex justify-center items-center min-h-screen text-red-500">Order not found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">Tracking Order</h1>
        <div className="flex items-center gap-4 mb-4 justify-center">
          <Image src={order.productImage} alt={order.productName} className="w-16 h-16 rounded-lg object-cover" />
          <div className="text-left">
            <div className="font-bold text-lg text-foreground">{order.productName}</div>
            <div className="text-xs text-muted-foreground">Order #{order.orderNumber}</div>
          </div>
        </div>
        <div className="mb-2 text-sm text-muted-foreground">
          <div>Ordered: {new Date(order.orderDate).toLocaleDateString()}</div>
          <div>Expected Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</div>
          <div>Status: <span className="font-bold text-primary">{order.status}</span></div>
        </div>
        <div className="mt-4 mb-4">
          <div className="mb-2 font-semibold text-foreground">Order Progress</div>
          <div className="flex items-center gap-2 mb-2">
            {order.statusSteps?.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div className={`flex items-center gap-1 ${step.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                  <span className={`w-2 h-2 rounded-full ${step.completed ? 'bg-primary' : 'bg-muted-foreground'}`}></span>
                  <span className="text-xs font-medium">{step.label}</span>
                </div>
                {idx < order.statusSteps.length - 1 && (
                  <span className={`flex-1 h-0.5 ${order.statusSteps[idx+1].completed ? 'bg-primary' : 'bg-muted-foreground'}`}></span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <Button variant="outline" iconName="ArrowLeft" iconPosition="left" onClick={() => navigate('/orders')}>Back to Orders</Button>
      </div>
    </div>
  );
};

export default OrderTracking;
