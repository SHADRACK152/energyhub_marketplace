import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const HowToBuy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">How to Buy</h1>
          <p className="text-primary-foreground/80 mt-2">
            Your complete guide to purchasing energy products on EnergyHub Marketplace
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Browse Products</h3>
            <p className="text-muted-foreground">
              Explore our extensive catalog of renewable energy products from verified sellers.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Compare & Select</h3>
            <p className="text-muted-foreground">
              Use our comparison tools to find the best products for your needs and budget.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Checkout</h3>
            <p className="text-muted-foreground">
              Complete your purchase with our secure payment system and track your order.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card p-6 rounded-lg border">
            <Icon name="Search" size={32} className="mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-4">Finding Products</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Use search filters by category, price, and ratings</li>
              <li>• Browse by product type: solar panels, batteries, inverters</li>
              <li>• Read product specifications and reviews</li>
              <li>• Check seller ratings and certifications</li>
            </ul>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <Icon name="ShoppingCart" size={32} className="mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-4">Making a Purchase</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Add items to your cart</li>
              <li>• Review your order details</li>
              <li>• Apply any available discounts</li>
              <li>• Choose shipping options</li>
            </ul>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <Icon name="CreditCard" size={32} className="mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-4">Payment Options</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Credit and debit cards</li>
              <li>• Bank transfers</li>
              <li>• PayPal and digital wallets</li>
              <li>• Financing options available</li>
            </ul>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <Icon name="Truck" size={32} className="mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-4">Shipping & Delivery</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Multiple shipping options</li>
              <li>• Real-time order tracking</li>
              <li>• Installation services available</li>
              <li>• Secure packaging and handling</li>
            </ul>
          </div>
        </div>

        <div className="bg-muted p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Start Shopping?</h2>
          <p className="text-muted-foreground mb-6">
            Explore our marketplace and find the perfect energy solutions for your needs
          </p>
          <div className="space-x-4">
            <Button 
              size="lg"
              onClick={() => navigate('/product-catalog-search')}
            >
              Browse Products
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/authentication-login-register')}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;
