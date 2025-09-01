import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductQuickViewModal from './ProductQuickViewModal';

const ProductCarousel = ({ 
  products, 
  onAddToCart, 
  onAddToWishlist, 
  onAddToCompare, 
  wishlistItems, 
  comparisonItems 
}) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const visibleCount = 5; // Show 5 at a time (center + 2 on each side)

  const handleScroll = (dir) => {
    setCenterIndex((prev) => {
      if (dir === 'left') return Math.max(prev - 1, 0);
      if (dir === 'right') return Math.min(prev + 1, products.length - 1);
      return prev;
    });
  };

  const getCardStyle = (i) => {
    const offset = i - centerIndex;
    if (offset === 0) {
      return 'z-20 scale-110 shadow-2xl';
    } else if (Math.abs(offset) === 1) {
      return 'z-10 scale-95 blur-sm opacity-80';
    } else if (Math.abs(offset) === 2) {
      return 'z-0 scale-90 blur-md opacity-60';
    } else {
      return 'hidden';
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center space-x-2 w-full relative" style={{ minHeight: 440 }}>
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full shadow p-2 z-30 hover:bg-primary hover:text-white transition"
          onClick={() => handleScroll('left')}
          disabled={centerIndex === 0}
        >
          &#8592;
        </button>
        <div className="flex items-center justify-center w-full gap-0">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`transition-all duration-500 mx-[-32px] ${getCardStyle(i)}`}
              style={{ pointerEvents: i === centerIndex ? 'auto' : 'none' }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                onAddToCompare={onAddToCompare}
                isInWishlist={wishlistItems?.includes(product?.id)}
                isInComparison={comparisonItems?.includes(product?.id)}
                onQuickView={setQuickViewProduct}
              />
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full shadow p-2 z-30 hover:bg-primary hover:text-white transition"
          onClick={() => handleScroll('right')}
          disabled={centerIndex === products.length - 1}
        >
          &#8594;
        </button>
      </div>
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
        onAddToCompare={onAddToCompare}
        isInWishlist={quickViewProduct && wishlistItems?.includes(quickViewProduct?.id)}
        isInComparison={quickViewProduct && comparisonItems?.includes(quickViewProduct?.id)}
      />
    </div>
  );
};

export default ProductCarousel;
