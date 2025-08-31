import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PromotionalBanner = ({ banners, onDismiss, onBannerClick }) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [dismissedBanners, setDismissedBanners] = useState(new Set());

  const activeBanners = banners?.filter((_, index) => !dismissedBanners?.has(index));

  if (activeBanners?.length === 0) {
    return null;
  }

  const handleDismiss = (index) => {
    const newDismissed = new Set(dismissedBanners);
    newDismissed?.add(index);
    setDismissedBanners(newDismissed);
    
    if (onDismiss) {
      onDismiss(index);
    }
  };

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % activeBanners?.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + activeBanners?.length) % activeBanners?.length);
  };

  const banner = activeBanners?.[currentBanner];
  if (!banner) return null;

  return (
    <div className="relative mb-6">
      <div 
        className={`${banner?.bgColor || 'bg-gradient-to-r from-accent to-accent/80'} text-white rounded-lg p-6 relative overflow-hidden cursor-pointer`}
        onClick={() => onBannerClick && onBannerClick(banner)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Icon name={banner?.icon || 'Zap'} size={24} className="mr-2" />
                <span className="text-sm font-medium opacity-90">
                  {banner?.category || 'Special Offer'}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-2">
                {banner?.title}
              </h3>
              
              <p className="text-white/90 mb-4 max-w-md">
                {banner?.description}
              </p>

              <div className="flex items-center space-x-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onBannerClick && onBannerClick(banner);
                  }}
                >
                  {banner?.ctaText || 'Shop Now'}
                </Button>
                
                {banner?.discount && (
                  <div className="bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold">
                      {banner?.discount}% OFF
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={(e) => {
                e?.stopPropagation();
                handleDismiss(banners?.indexOf(banner));
              }}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Navigation Dots */}
      {activeBanners?.length > 1 && (
        <div className="flex items-center justify-center mt-4 space-x-2">
          <button
            onClick={prevBanner}
            className="p-1 rounded-full hover:bg-muted transition-smooth"
          >
            <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
          </button>
          
          <div className="flex space-x-2">
            {activeBanners?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === currentBanner 
                    ? 'bg-primary' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextBanner}
            className="p-1 rounded-full hover:bg-muted transition-smooth"
          >
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PromotionalBanner;