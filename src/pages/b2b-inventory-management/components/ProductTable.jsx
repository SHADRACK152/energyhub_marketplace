import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProductTable = ({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  onSelectAll, 
  onEditProduct, 
  onDeleteProduct,
  onUpdateStock,
  onUpdatePrice,
  onToggleStatus
}) => {
  const [editingStock, setEditingStock] = useState({});
  const [editingPrice, setEditingPrice] = useState({});

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

  const handleStockEdit = (productId, value) => {
    setEditingStock({ ...editingStock, [productId]: value });
  };

  const handleStockSave = (productId) => {
    const newStock = editingStock?.[productId];
    if (newStock !== undefined) {
      onUpdateStock(productId, parseInt(newStock));
      setEditingStock({ ...editingStock, [productId]: undefined });
    }
  };

  const handlePriceEdit = (productId, value) => {
    setEditingPrice({ ...editingPrice, [productId]: value });
  };

  const handlePriceSave = (productId) => {
    const newPrice = editingPrice?.[productId];
    if (newPrice !== undefined) {
      onUpdatePrice(productId, parseFloat(newPrice));
      setEditingPrice({ ...editingPrice, [productId]: undefined });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedProducts?.length === products?.length}
                  onChange={onSelectAll}
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">Product</th>
              <th className="text-left p-4 font-medium text-foreground">SKU</th>
              <th className="text-left p-4 font-medium text-foreground">Category</th>
              <th className="text-left p-4 font-medium text-foreground">Stock</th>
              <th className="text-left p-4 font-medium text-foreground">Price</th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <Checkbox
                    checked={selectedProducts?.includes(product?.id)}
                    onChange={() => onSelectProduct(product?.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{product?.name}</div>
                      <div className="text-sm text-muted-foreground">{product?.brand}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-muted-foreground">{product?.sku}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">{product?.category}</span>
                </td>
                <td className="p-4">
                  {editingStock?.[product?.id] !== undefined ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={editingStock?.[product?.id]}
                        onChange={(e) => handleStockEdit(product?.id, e?.target?.value)}
                        className="w-20"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleStockSave(product?.id)}
                      >
                        <Icon name="Check" size={16} />
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingStock({ ...editingStock, [product?.id]: product?.stock })}
                      className={`px-2 py-1 rounded-md text-sm font-medium ${getStockStatusBg(product?.stock)} ${getStockStatusColor(product?.stock)} hover:opacity-80 transition-smooth`}
                    >
                      {product?.stock} units
                    </button>
                  )}
                </td>
                <td className="p-4">
                  {editingPrice?.[product?.id] !== undefined ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={editingPrice?.[product?.id]}
                        onChange={(e) => handlePriceEdit(product?.id, e?.target?.value)}
                        className="w-24"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePriceSave(product?.id)}
                      >
                        <Icon name="Check" size={16} />
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingPrice({ ...editingPrice, [product?.id]: product?.price })}
                      className="text-foreground hover:text-primary transition-smooth font-medium"
                    >
                      ${product?.price?.toLocaleString()}
                    </button>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onToggleStatus(product?.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth ${
                      product?.status === 'active' ?'bg-success/10 text-success hover:bg-success/20' :'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {product?.status === 'active' ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditProduct(product?.id)}
                    >
                      <Icon name="Edit" size={16} />
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;