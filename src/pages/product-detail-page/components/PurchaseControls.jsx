import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PurchaseControls = ({ product, quantity, onQuantityChange, onAddToCart, onBuyNow }) => {
  const incrementQuantity = () => {
    if (quantity < product?.stockCount) {
      onQuantityChange(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityInput = (e) => {
    const value = parseInt(e?.target?.value) || 1;
    if (value >= 1 && value <= product?.stockCount) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="border border-border rounded-lg p-6 mt-6 space-y-4">
      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Quantity
        </label>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-input rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="h-8 w-8 rounded-none border-0"
            >
              <Icon name="Minus" size={16} />
            </Button>
            
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityInput}
              min="1"
              max={product?.stockCount}
              className="w-16 h-8 text-center border-0 bg-transparent text-sm focus:outline-none"
            />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={incrementQuantity}
              disabled={quantity >= product?.stockCount}
              className="h-8 w-8 rounded-none border-0"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
          
          <span className="text-sm text-muted-foreground">
            Max: {product?.stockCount}
          </span>
        </div>
      </div>

      {/* Total Price */}
      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
        <span className="text-sm font-medium text-muted-foreground">
          Total ({quantity} {quantity === 1 ? 'item' : 'items'})
        </span>
        <span className="text-xl font-bold text-foreground">
          ${(product?.price * quantity)?.toFixed(2)}
        </span>
      </div>

      {/* Purchase Buttons */}
      <div className="space-y-3 hidden lg:block">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={onBuyNow}
          disabled={!product?.inStock}
          iconName="Zap"
          iconPosition="left"
        >
          Buy Now
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={onAddToCart}
          disabled={!product?.inStock}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart
        </Button>
      </div>

      {/* Stock Warning */}
      {product?.stockCount <= 10 && product?.stockCount > 0 && (
        <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-md">
          <Icon name="AlertTriangle" size={16} className="text-warning" />
          <span className="text-sm text-warning font-medium">
            Only {product?.stockCount} left in stock!
          </span>
        </div>
      )}

      {/* Out of Stock */}
      {!product?.inStock && (
        <div className="flex items-center justify-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-md">
          <Icon name="XCircle" size={16} className="text-error" />
          <span className="text-sm text-error font-medium">
            Currently out of stock
          </span>
        </div>
      )}
    </div>
  );
};

export default PurchaseControls;