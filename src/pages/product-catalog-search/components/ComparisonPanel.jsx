import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import ComparisonModal from './ComparisonModal';

const ComparisonPanel = ({ isOpen, onClose, comparisonProducts, onRemoveFromComparison }) => {
  const [showModal, setShowModal] = useState(false);
  if (!isOpen || comparisonProducts?.length === 0) return null;

  return (
    <>
      {/* Mobile Bottom Sheet */}
      <div className="lg:hidden">
        {isOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={onClose} />
        )}
        <div className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Compare Products ({comparisonProducts?.length})</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {comparisonProducts?.map((product) => (
                <div key={product?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{product?.name}</h4>
                    <p className="text-sm text-muted-foreground">${product?.price}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveFromComparison(product?.id)}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="default" fullWidth onClick={() => setShowModal(true)}>
                View Detailed Comparison
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Side Panel */}
      <div className="hidden lg:block">
        <div className={`fixed top-16 right-0 h-screen w-96 bg-card border-l border-border z-40 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Compare Products</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {comparisonProducts?.length} of 3 products selected
            </p>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {comparisonProducts?.map((product) => (
                <div key={product?.id} className="border border-border rounded-lg overflow-hidden">
                  <div className="relative">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      onClick={() => onRemoveFromComparison(product?.id)}
                      className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background transition-smooth"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">{product?.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{product?.seller}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">${product?.price}</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-warning fill-current" />
                        <span className="text-xs">{product?.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {comparisonProducts?.length > 0 && (
              <div className="mt-6 space-y-2">
                <Button variant="default" fullWidth onClick={() => setShowModal(true)}>
                  View Detailed Comparison
                </Button>
                <Button variant="outline" fullWidth onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            )}
            <ComparisonModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              products={comparisonProducts}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ComparisonPanel;