import React, { useState, useEffect } from 'react';
import ProductQnA from './ProductQnA';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductQuickViewModal = (props) => {
  const { product, isOpen, onClose, onAddToCart, onAddToWishlist, onAddToCompare, isInWishlist, isInComparison } = props;

  // Hooks must be called unconditionally at top-level of component
  const [galleryIndex, setGalleryIndex] = useState(0);
  // QnA state from backend
  const [qnaList, setQnaList] = useState([]);
  const [loadingQnA, setLoadingQnA] = useState(false);
  const [qnaError, setQnaError] = useState(null);

  // Fetch QnA when modal opens or product changes
  useEffect(() => {
    if (!isOpen || !product?.id) return;
    setLoadingQnA(true);
    setQnaError(null);
    fetch(`/api/qna/${product.id}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => setQnaList(data))
      .catch(() => setQnaError('Failed to load Q&A'))
      .finally(() => setLoadingQnA(false));
  }, [isOpen, product?.id]);

  // Submit new question to backend
  const handleSubmitQuestion = async (question) => {
    try {
      const res = await fetch(`/api/qna/${product.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      if (!res.ok) throw new Error('Failed to submit question');
      const newQna = await res.json();
      setQnaList(prev => [newQna, ...prev]);
    } catch (err) {
      setQnaError('Could not submit question');
    }
  };

  // Early return after hooks are declared
  if (!isOpen || !product) return null;

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images.filter(Boolean)
    : product.image
      ? [product.image]
      : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative animate-fade-in">
        <button className="absolute top-4 right-4 text-muted-foreground hover:text-primary" onClick={onClose}>
          <Icon name="X" size={24} />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-64 h-64 bg-white rounded-xl overflow-hidden flex items-center justify-center mb-4 relative">
              <Image src={images[galleryIndex]} alt={product.name} className="w-full h-full object-contain transition-all duration-300" />
              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-primary hover:text-white transition"
                    onClick={() => setGalleryIndex(i => (i - 1 + images.length) % images.length)}
                  >
                    <Icon name="ChevronLeft" size={18} />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-primary hover:text-white transition"
                    onClick={() => setGalleryIndex(i => (i + 1) % images.length)}
                  >
                    <Icon name="ChevronRight" size={18} />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`w-10 h-10 rounded-lg overflow-hidden border-2 ${galleryIndex === idx ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setGalleryIndex(idx)}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-foreground mb-1">{product.name}</h2>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
              {product.badge && (
                <span className={`ml-2 px-2 py-1 text-xs rounded-full font-bold shadow-md uppercase tracking-wide ${
                  product?.badge === 'New' ? 'bg-success text-success-foreground' :
                  product?.badge === 'Sale' ? 'bg-error text-error-foreground' :
                  product?.badge === 'Popular' ? 'bg-primary/90 text-white' :
                  'bg-accent text-accent-foreground'
                }`}>
                  {product.badge}
                </span>
              )}
              {product.eco && (
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold shadow">Eco</span>
              )}
            </div>
            {/* Reviews Preview */}
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Star" size={16} className="text-warning" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span>
              {product.recentReview && (
                <span className="ml-2 text-xs italic text-muted-foreground truncate max-w-[180px]">“{product.recentReview}”</span>
              )}
            </div>
            {/* Vendor Info */}
            <div className="mb-2 text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="Store" size={16} className="text-primary/80" />
              <span>{product.seller}</span>
              {product.sellerRating && (
                <span className="flex items-center gap-1 ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  <Icon name="Star" size={12} className="text-warning" />
                  {product.sellerRating}
                </span>
              )}
              {product.sellerLocation && (
                <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
                  <Icon name="MapPin" size={12} className="inline text-muted-foreground mr-1" />
                  {product.sellerLocation}
                </span>
              )}
            </div>
            {/* Shipping/Delivery Info */}
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="Truck" size={14} className="text-success" />
              <span>Free Shipping</span>
              <span className="ml-2">Estimated delivery: 2-4 days</span>
            </div>
            {/* Interactive Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <details className="mb-3 bg-muted/40 rounded-lg p-3">
                <summary className="font-semibold cursor-pointer text-sm text-foreground mb-2">View Specifications</summary>
                <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                  {product.specifications.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon name="CheckCircle" size={12} className="text-success" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </details>
            )}
            {/* Social Share Buttons */}
            <div className="mb-3 flex gap-2 items-center">
              <span className="text-xs text-muted-foreground">Share:</span>
              <a
                className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                title="Share on Facebook"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/product/' + product.id)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="Facebook" size={16} className="text-blue-600" />
              </a>
              <a
                className="p-1 rounded-full bg-sky-100 hover:bg-sky-200 transition"
                title="Share on Twitter"
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/product/' + product.id)}&text=${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="Twitter" size={16} className="text-sky-500" />
              </a>
              <a
                className="p-1 rounded-full bg-green-100 hover:bg-green-200 transition"
                title="Share on WhatsApp"
                href={`https://wa.me/?text=${encodeURIComponent(product.name + ' ' + window.location.origin + '/product/' + product.id)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="MessageCircle" size={16} className="text-green-600" />
              </a>
              <button
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                title="Copy Link"
                onClick={() => {
                  const url = window.location.origin + '/product/' + product.id;
                  navigator.clipboard.writeText(url);
                }}
              >
                <Icon name="Link" size={16} className="text-gray-600" />
              </button>
            </div>
            {/* Related Products Carousel (placeholder) */}
            {product.relatedProducts && product.relatedProducts.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2 text-foreground">Related Products</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.relatedProducts.map((rel, idx) => (
                    <div key={idx} className="min-w-[120px] bg-background rounded-lg shadow p-2 flex flex-col items-center">
                      <Image src={rel.image} alt={rel.name} className="w-16 h-16 object-contain mb-1" />
                      <div className="text-xs font-medium text-foreground text-center line-clamp-2">{rel.name}</div>
                      <div className="text-xs text-primary font-bold">${rel.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Actions */}
            <div className="flex gap-2 mb-2">
              <Button
                variant="default"
                size="sm"
                disabled={!product.inStock}
                onClick={() => onAddToCart(product.id)}
                iconName="ShoppingCart"
                iconPosition="left"
                iconSize={16}
              >
                Add to Cart
              </Button>
              <Button
                variant={isInWishlist ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => onAddToWishlist(product.id)}
                iconName="Heart"
                iconPosition="left"
                iconSize={16}
              >
                {isInWishlist ? 'Wishlisted' : 'Wishlist'}
              </Button>
              <Button
                variant={isInComparison ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => onAddToCompare(product.id)}
                iconName="GitCompare"
                iconPosition="left"
                iconSize={16}
              >
                Compare
              </Button>
            </div>
            {/* Stock Level Indicator */}
            {product.inStock && product.stockLevel !== undefined && (
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div className="bg-success h-2 rounded-full" style={{ width: `${Math.min(100, product.stockLevel)}%` }}></div>
              </div>
            )}
            {/* Discount Countdown (placeholder) */}
            {product.discountEndsAt && (
              <div className="mt-2 text-xs text-error font-semibold animate-pulse">Sale ends soon!</div>
            )}
          </div>
        </div>
        {/* Product Q&A Section */}
        <ProductQnA
          productId={product.id}
          qnaList={qnaList}
          onSubmitQuestion={handleSubmitQuestion}
          loading={loadingQnA}
          error={qnaError}
        />
      </div>
    </div>
  );
};

export default ProductQuickViewModal;
