import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="bg-card rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-success mb-4">Thank you for your order!</h1>
        <p className="text-muted-foreground mb-6">
          Your order has been placed successfully. A confirmation email will be sent to you shortly.
        </p>
        {orderData && (
          <div className="mb-6 text-left">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            <ul className="text-sm space-y-1">
              {orderData.items?.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity} - ${item.price?.toFixed(2)}
                </li>
              ))}
              <li className="font-bold mt-2">Total: ${orderData.total?.toFixed(2)}</li>
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-3 mt-4">
          <Button
            variant="default"
            onClick={() => navigate('/orders')}
            iconName="List"
            iconPosition="left"
          >
            View My Orders
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
