import React from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProductGrid = ({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  onEditProduct, 
  onDeleteProduct,
  onToggleStatus
}) => {
  const getStockStatusColor = (stock) => {
    if (stock === 0) return 'text-error';
    if (stock < 10) return 'text-warning';
    return 'text-success';
  };

  const getStockStatusBg = (stock) => {
    if (stock === 0) return 'bg-error/10';
    if (stock < 10) return 'bg-warning/10';
    return 'bg-success/10';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <div key={product?.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-card transition-smooth">
          {/* Product Image */}
          <div className="relative aspect-square bg-muted">
            <Image
              src={product?.image}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
            
            {/* Selection Checkbox */}
            <div className="absolute top-3 left-3">
              <Checkbox
                checked={selectedProducts?.includes(product?.id)}
                onChange={() => onSelectProduct(product?.id)}
                className="bg-card/90 backdrop-blur-sm"
              />
            </div>

            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <button
                onClick={() => onToggleStatus(product?.id)}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-smooth ${
                  product?.status === 'active' ?'bg-success/90 text-white hover:bg-success' :'bg-muted/90 text-muted-foreground hover:bg-muted'
                }`}
              >
                {product?.status === 'active' ? 'Active' : 'Inactive'}
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2">
              <h3 className="font-medium text-foreground line-clamp-2">{product?.name}</h3>
              <p className="text-sm text-muted-foreground">{product?.brand}</p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-muted-foreground">{product?.sku}</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                {product?.category}
              </span>
            </div>

            {/* Stock and Price */}
            <div className="flex items-center justify-between mb-4">
              <div className={`px-2 py-1 rounded-md text-sm font-medium ${getStockStatusBg(product?.stock)} ${getStockStatusColor(product?.stock)}`}>
                {product?.stock} units
              </div>
              <div className="text-lg font-semibold text-foreground">
                ${product?.price?.toLocaleString()}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                onClick={() => onEditProduct(product?.id)}
                fullWidth
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="icon"
              >
                <Icon name="BarChart3" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
              >
                <Icon name="Copy" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteProduct(product?.id)}
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;