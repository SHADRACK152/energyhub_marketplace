import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.orderData;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Order Confirmed!</h1>
        <p className="text-lg text-foreground mb-2">Thank you for your purchase.</p>
        {order && (
          <div className="mb-4">
            <div className="text-sm text-muted-foreground mb-1">Order Number:</div>
            <div className="font-semibold text-lg text-foreground mb-2">{order.orderNumber}</div>
            <div className="text-sm text-muted-foreground mb-1">Product(s):</div>
            <div className="font-medium text-foreground mb-2">{order.productName}</div>
            <div className="text-sm text-muted-foreground mb-1">Total:</div>
            <div className="font-bold text-primary text-lg mb-2">${order.price}</div>
          </div>
        )}
        <Button
          variant="default"
          size="lg"
          iconName="List"
          iconPosition="left"
          onClick={() => navigate('/orders')}
        >
          Go to My Orders
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
