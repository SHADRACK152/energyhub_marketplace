import React from 'react';
import { useTranslation } from '../../../utils/i18n.jsx';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderSummary = ({
  cartItems,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  promoCode,
  currentStep
}) => {
  const { t } = useTranslation();
  const formatCurrency = (amount) => {
    return `$${amount?.toFixed(2)}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold text-foreground">{t('order.summary')}</h3>

      {/* Items List */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">
          {t('cart.items')} ({cartItems?.length})
        </h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {cartItems?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
                {item?.quantity > 1 && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {item?.quantity}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-2">
                  {item?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item?.seller}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">
                    {t('cart.qty')}: {item?.quantity}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {formatCurrency(item?.price * item?.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('order.subtotal')}</span>
          <span className="text-foreground">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('order.shipping')}</span>
          <span className="text-foreground">
            {shipping === 0 ? (
              <span className="text-success">{t('order.free')}</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('order.tax')}</span>
          <span className="text-foreground">{formatCurrency(tax)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground">{t('order.discount')}</span>
              {promoCode && (
                <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">
                  {promoCode}
                </span>
              )}
            </div>
            <span className="text-success">-{formatCurrency(discount)}</span>
          </div>
        )}

        {/* Free Shipping Notice */}
        {shipping === 0 && subtotal > 500 && (
          <div className="bg-success/10 border border-success/20 rounded-md p-3">
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={14} className="text-success" />
              <span className="text-xs text-success font-medium">
                {t('shipping.free')}
              </span>
            </div>
          </div>
        )}

        {/* Almost Free Shipping */}
        {shipping > 0 && subtotal < 500 && (
          <div className="bg-warning/10 border border-warning/20 rounded-md p-3">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={14} className="text-warning" />
              <span className="text-xs text-warning font-medium">
                {t('shipping.addMore', { amount: formatCurrency(500 - subtotal) })}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-border pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span className="text-foreground">{t('order.total')}</span>
          <span className="text-foreground">{formatCurrency(total)}</span>
        </div>
        
        {tax > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            {t('order.includesTax', { amount: formatCurrency(tax) })}
          </p>
        )}
      </div>

      {/* Security Badges */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} className="text-success" />
            <span>{t('security.secure')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={12} className="text-primary" />
            <span>{t('security.sslProtected')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span>{t('security.verified')}</span>
          </div>
        </div>
      </div>

      {/* Price Protection Notice */}
      {currentStep === 'payment' && (
        <div className="bg-primary/10 border border-primary/20 rounded-md p-3">
          <div className="flex items-start space-x-2">
            <Icon name="Clock" size={14} className="text-primary mt-0.5" />
            <div>
              <p className="text-xs text-primary font-medium">{t('security.priceProtection')}</p>
              <p className="text-xs text-primary/80">
                {t('security.pricesLocked')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Money Back Guarantee */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
          <Icon name="RefreshCw" size={12} />
          <span>{t('security.moneyBack')}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;