import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images?.length) % images?.length);
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={images?.[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          className={`w-full h-full object-cover cursor-zoom-in transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          onClick={handleImageClick}
        />
        
        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {images?.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded-md text-xs font-medium">
            {selectedImage + 1} / {images?.length}
          </div>
        )}

        {/* Zoom Reset Button */}
        {isZoomed && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsZoomed(false)}
            className="absolute top-2 right-2"
            iconName="ZoomOut"
            iconPosition="left"
          >
            Reset Zoom
          </Button>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Mobile Swipe Indicator */}
      <div className="lg:hidden text-center text-xs text-muted-foreground">
        Swipe or tap arrows to view more images
      </div>
    </div>
  );
};

export default ProductImageGallery;