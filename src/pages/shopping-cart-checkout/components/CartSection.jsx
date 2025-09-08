import React from 'react';
import { useTranslation } from '../../../utils/i18n.jsx';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CartSection = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  promoCode,
  onPromoCodeChange,
  onApplyPromoCode,
  promoDiscount,
  promoFeedback,
  promoLoading,
  appliedPromoData
}) => {
  const { t } = useTranslation();
  const handleQuantityChange = (itemId, change) => {
    const item = cartItems?.find(i => i?.id === itemId);
    if (item) {
      const newQuantity = Math.max(0, Math.min(item?.quantity + change, item?.stockCount));
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  if (cartItems?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{t('cart.yourCartIsEmpty')}</h3>
        <p className="text-muted-foreground mb-6">
          {t('cart.looksLikeEmpty')}
        </p>
        <Button
          variant="default"
          onClick={() => window.history?.back()}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          {t('checkout.continueShopping')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          {t('cart.shoppingCart')} ({cartItems?.length} {cartItems?.length === 1 ? t('cart.item') : t('cart.items')})
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.history?.back()}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          {t('checkout.continueShopping')}
        </Button>
      </div>
      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems?.map((item) => (
          <div key={item?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-4">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground line-clamp-2 mb-1">
                      {item?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t('cart.soldBy')} {item?.seller}
                    </p>
                    
                    {/* Stock Status */}
                    <div className="flex items-center space-x-2 mb-2">
                      {item?.inStock ? (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span className="text-sm text-success font-medium">{t('cart.inStock')}</span>
                          {item?.stockCount <= 10 && (
                            <span className="text-sm text-warning">
                              ({t('cart.onlyLeft', { count: item?.stockCount })})
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-error rounded-full"></div>
                          <span className="text-sm text-error font-medium">{t('cart.outOfStock')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveItem(item?.id)}
                    className="text-muted-foreground hover:text-error"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>

                {/* Quantity and Price */}
                <div className="flex items-center justify-between mt-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-muted-foreground">{t('cart.qty')}:</span>
                    <div className="flex items-center border border-input rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(item?.id, -1)}
                        disabled={item?.quantity <= 1}
                        className="h-8 w-8 rounded-none border-0"
                      >
                        <Icon name="Minus" size={14} />
                      </Button>
                      
                      <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                        {item?.quantity}
                      </span>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(item?.id, 1)}
                        disabled={item?.quantity >= item?.stockCount || !item?.inStock}
                        className="h-8 w-8 rounded-none border-0"
                      >
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-foreground">
                        ${(item?.price * item?.quantity)?.toFixed(2)}
                      </span>
                      {item?.originalPrice && item?.originalPrice > item?.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${(item?.originalPrice * item?.quantity)?.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ${item?.price} {t('cart.each')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Promo Code Section */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-3">{t('promo.code')}</h3>
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder={t('promo.enter')}
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e?.target?.value)}
              className="w-full"
            />
          </div>
          <Button
            variant="outline"
            onClick={onApplyPromoCode}
            disabled={!promoCode || promoLoading}
          >
            {promoLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                {t('promo.validating')}
              </>
            ) : (
              t('promo.apply')
            )}
          </Button>
        </div>
        
        {promoFeedback && (
          <div className={`mt-3 flex items-center space-x-2 ${promoDiscount > 0 || appliedPromoData?.freeShipping ? 'text-success' : 'text-error'}`}>
            <Icon name={promoDiscount > 0 || appliedPromoData?.freeShipping ? 'CheckCircle' : 'AlertTriangle'} size={16} />
            <span className="text-sm font-medium">
              {promoFeedback}
            </span>
          </div>
        )}
      </div>
      {/* Bulk Discount Info */}
      {cartItems?.some(item => item?.quantity > 1) && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-primary mb-1">{t('shipping.volumeDiscount')}</h4>
              <p className="text-sm text-primary/80">
                {t('shipping.volumeDescription')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSection;