import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  products, 
  onAddToCart, 
  onAddToWishlist, 
  onAddToCompare, 
  wishlistItems, 
  comparisonItems 
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
      {products?.map((product) => (
        <ProductCard
          key={product?.id}
          product={product}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          onAddToCompare={onAddToCompare}
          isInWishlist={wishlistItems?.includes(product?.id)}
          isInComparison={comparisonItems?.includes(product?.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;