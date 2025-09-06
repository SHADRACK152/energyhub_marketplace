import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AddProductModal = ({ isOpen, onClose, onSave, product, isEdit }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const emptyProduct = {
    name: '',
    brand: '',
    sku: '',
    category: '',
    description: '',
    specifications: {
      power: '',
      voltage: '',
      efficiency: '',
      warranty: '',
      dimensions: '',
      weight: ''
    },
    pricing: {
      basePrice: '',
      bulkPricing: [
        { quantity: 10, discount: 5 },
        { quantity: 50, discount: 10 },
        { quantity: 100, discount: 15 }
      ]
    },
    inventory: {
      stock: '',
      lowStockThreshold: '',
      trackInventory: true
    },
    images: [],
    status: 'active',
    featured: false
  };
  const [productData, setProductData] = useState(emptyProduct);

  useEffect(() => {
    if (isOpen) {
      if (isEdit && product) {
        setProductData(product);
      } else {
        setProductData(emptyProduct);
      }
      setActiveTab('basic');
    }
  }, [isOpen, isEdit, product]);

  const categoryOptions = [
    { value: 'solar-panels', label: 'Solar Panels' },
    { value: 'batteries', label: 'Batteries' },
    { value: 'inverters', label: 'Inverters' },
    { value: 'mounting', label: 'Mounting Systems' },
    { value: 'cables', label: 'Cables & Wiring' },
    { value: 'monitoring', label: 'Monitoring Systems' }
  ];

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: 'Info' },
    { id: 'specifications', label: 'Specifications', icon: 'Settings' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' },
    { id: 'images', label: 'Images', icon: 'Image' }
  ];

  // Validation for each step
  const validateTab = (tabId) => {
    if (tabId === 'basic') {
      return productData.name && productData.brand && productData.sku && productData.category && productData.description;
    }
    if (tabId === 'specifications') {
      const s = productData.specifications;
      return s.power && s.voltage && s.efficiency && s.warranty && s.dimensions && s.weight;
    }
    if (tabId === 'pricing') {
      return productData.pricing.basePrice && productData.inventory.stock;
    }
    if (tabId === 'images') {
      return productData.images && productData.images.length > 0;
    }
    return true;
  };

  // Find the index of the current tab
  const currentTabIdx = tabs.findIndex(t => t.id === activeTab);

  // Only allow navigation to next tab if current is valid
  const goToTab = (tabId) => {
    const targetIdx = tabs.findIndex(t => t.id === tabId);
    if (targetIdx > currentTabIdx) {
      // Only allow forward if all previous tabs are valid
      for (let i = 0; i <= currentTabIdx; i++) {
        if (!validateTab(tabs[i].id)) {
          return;
        }
      }
    }
    setActiveTab(tabId);
  };

  const handleInputChange = (section, field, value) => {
    if (section) {
      setProductData(prev => ({
        ...prev,
        [section]: {
          ...prev?.[section],
          [field]: value
        }
      }));
    } else {
      setProductData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    onSave(productData);
    onClose();
    // Reset form
    setProductData({
      name: '',
      brand: '',
      sku: '',
      category: '',
      description: '',
      specifications: {
        power: '',
        voltage: '',
        efficiency: '',
        warranty: '',
        dimensions: '',
        weight: ''
      },
      pricing: {
        basePrice: '',
        bulkPricing: [
          { quantity: 10, discount: 5 },
          { quantity: 50, discount: 10 },
          { quantity: 100, discount: 15 }
        ]
      },
      inventory: {
        stock: '',
        lowStockThreshold: '',
        trackInventory: true
      },
      images: [],
      status: 'active',
      featured: false
    });
    setActiveTab('basic');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Add New Product</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        {/* Modern Stepper */}
        <div className="flex items-center justify-center gap-4 py-6 bg-gradient-to-r from-primary/10 to-accent/10">
          {tabs.map((tab, idx) => {
            let disabled = false;
            if (idx > currentTabIdx) {
              for (let i = 0; i < idx; i++) {
                if (!validateTab(tabs[i].id)) disabled = true;
              }
            }
            return (
              <div key={tab.id} className="flex items-center">
                <button
                  onClick={() => !disabled && goToTab(tab.id)}
                  disabled={disabled}
                  className={`rounded-full w-10 h-10 flex items-center justify-center border-2 transition-all duration-200 shadow-sm
                    ${activeTab === tab.id ? 'bg-primary text-white border-primary scale-110' : disabled ? 'bg-muted text-muted-foreground border-border opacity-50 cursor-not-allowed' : 'bg-background text-primary border-primary/40 hover:bg-primary/10'}
                  `}
                  aria-label={tab.label}
                >
                  <Icon name={tab.icon} size={20} />
                </button>
                {idx < tabs.length - 1 && (
                  <div className="w-10 h-1 bg-gradient-to-r from-primary/40 to-accent/40 mx-2 rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        {/* Content */}
  <div className="p-8 overflow-y-auto max-h-[65vh] animate-fade-in rounded-b-lg bg-gradient-to-br from-background via-white/80 to-accent/10 shadow-xl">
          {tabs.map((tab, idx) => (
            activeTab === tab.id && (
              <div key={tab.id} className="space-y-4">
                {/* ...existing code for each tab, unchanged... */}
                {tab.id === 'basic' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Product Name"
                        required
                        value={productData?.name}
                        onChange={(e) => handleInputChange(null, 'name', e?.target?.value)}
                        placeholder="Enter product name"
                      />
                      <Input
                        label="Brand"
                        required
                        value={productData?.brand}
                        onChange={(e) => handleInputChange(null, 'brand', e?.target?.value)}
                        placeholder="Enter brand name"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="SKU"
                        required
                        value={productData?.sku}
                        onChange={(e) => handleInputChange(null, 'sku', e?.target?.value)}
                        placeholder="Enter SKU"
                      />
                      <Select
                        label="Category"
                        required
                        options={categoryOptions}
                        value={productData?.category}
                        onChange={(value) => handleInputChange(null, 'category', value)}
                        placeholder="Select category"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Description
                      </label>
                      <textarea
                        value={productData?.description}
                        onChange={(e) => handleInputChange(null, 'description', e?.target?.value)}
                        placeholder="Enter product description"
                        rows={4}
                        className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Checkbox
                        label="Featured Product"
                        checked={productData?.featured}
                        onChange={(e) => handleInputChange(null, 'featured', e?.target?.checked)}
                      />
                      <Select
                        label="Status"
                        options={[
                          { value: 'active', label: 'Active' },
                          { value: 'inactive', label: 'Inactive' },
                          { value: 'draft', label: 'Draft' }
                        ]}
                        value={productData?.status}
                        onChange={(value) => handleInputChange(null, 'status', value)}
                      />
                    </div>
                  </>
                )}
                {tab.id === 'specifications' && (
                  // ...existing code for specifications tab...
                  <>{/* ...existing code... */}</>
                )}
                {tab.id === 'pricing' && (
                  // ...existing code for pricing tab...
                  <>{/* ...existing code... */}</>
                )}
                {tab.id === 'images' && (
                  // ...existing code for images tab...
                  <>{/* ...existing code... */}</>
                )}
                {/* Navigation buttons */}
                <div className="flex justify-between pt-8 gap-4">
                  <Button
                    variant="ghost"
                    className="rounded-full px-6 py-2 text-base shadow hover:bg-primary/10 transition-all duration-150"
                    onClick={() => {
                      if (currentTabIdx > 0) setActiveTab(tabs[currentTabIdx - 1].id);
                    }}
                    disabled={currentTabIdx === 0}
                  >
                    <Icon name="ArrowLeft" size={18} className="mr-2" /> Previous
                  </Button>
                  {currentTabIdx < tabs.length - 1 ? (
                    <Button
                      variant="default"
                      className="rounded-full px-8 py-2 text-base shadow-lg bg-gradient-to-r from-primary to-accent text-white hover:scale-105 hover:from-accent hover:to-primary transition-all duration-150"
                      onClick={() => {
                        if (validateTab(activeTab)) setActiveTab(tabs[currentTabIdx + 1].id);
                      }}
                      disabled={!validateTab(activeTab)}
                    >
                      Next <Icon name="ArrowRight" size={18} className="ml-2" />
                    </Button>
                  ) : null}
                </div>
              </div>
            )
          ))}

          {activeTab === 'specifications' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Power Rating (W)"
                  value={productData?.specifications?.power}
                  onChange={(e) => handleInputChange('specifications', 'power', e?.target?.value)}
                  placeholder="e.g., 400"
                />
                <Input
                  label="Voltage (V)"
                  value={productData?.specifications?.voltage}
                  onChange={(e) => handleInputChange('specifications', 'voltage', e?.target?.value)}
                  placeholder="e.g., 24"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Efficiency (%)"
                  value={productData?.specifications?.efficiency}
                  onChange={(e) => handleInputChange('specifications', 'efficiency', e?.target?.value)}
                  placeholder="e.g., 22.1"
                />
                <Input
                  label="Warranty (Years)"
                  value={productData?.specifications?.warranty}
                  onChange={(e) => handleInputChange('specifications', 'warranty', e?.target?.value)}
                  placeholder="e.g., 25"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Dimensions (L×W×H)"
                  value={productData?.specifications?.dimensions}
                  onChange={(e) => handleInputChange('specifications', 'dimensions', e?.target?.value)}
                  placeholder="e.g., 2108×1048×40mm"
                />
                <Input
                  label="Weight (kg)"
                  value={productData?.specifications?.weight}
                  onChange={(e) => handleInputChange('specifications', 'weight', e?.target?.value)}
                  placeholder="e.g., 22.5"
                />
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Base Price ($)"
                  type="number"
                  step="0.01"
                  required
                  value={productData?.pricing?.basePrice}
                  onChange={(e) => handleInputChange('pricing', 'basePrice', e?.target?.value)}
                  placeholder="Enter base price"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Stock Quantity"
                    type="number"
                    required
                    value={productData?.inventory?.stock}
                    onChange={(e) => handleInputChange('inventory', 'stock', e?.target?.value)}
                    placeholder="Enter stock quantity"
                  />
                  <Input
                    label="Low Stock Alert"
                    type="number"
                    value={productData?.inventory?.lowStockThreshold}
                    onChange={(e) => handleInputChange('inventory', 'lowStockThreshold', e?.target?.value)}
                    placeholder="e.g., 10"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Bulk Pricing Tiers</h4>
                <div className="space-y-3">
                  {productData?.pricing?.bulkPricing?.map((tier, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-md">
                      <span className="text-sm text-muted-foreground min-w-0">
                        {tier?.quantity}+ units
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {tier?.discount}% discount
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Checkbox
                label="Track inventory for this product"
                checked={productData?.inventory?.trackInventory}
                onChange={(e) => handleInputChange('inventory', 'trackInventory', e?.target?.checked)}
              />
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h4 className="text-lg font-medium text-foreground mb-2">Upload Product Images</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop images here, or click to browse
                </p>
                <div className="inline-block">
                  <input
                    id="product-image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      // Only allow up to 10 images
                      const limitedFiles = files.slice(0, 10 - productData.images.length);
                      // Filter valid images and check size
                      const validFiles = limitedFiles.filter(file => file.size <= 5 * 1024 * 1024);
                      // Read files as data URLs for preview
                      Promise.all(validFiles.map(file => {
                        return new Promise((resolve, reject) => {
                          const reader = new FileReader();
                          reader.onload = () => resolve({ name: file.name, url: reader.result, file });
                          reader.onerror = reject;
                          reader.readAsDataURL(file);
                        });
                      })).then(images => {
                        setProductData(prev => ({
                          ...prev,
                          images: [...prev.images, ...images]
                        }));
                      });
                      // Reset input value so same file can be selected again
                      e.target.value = '';
                    }}
                  />
                  <Button
                    variant="outline"
                    as="span"
                    onClick={() => document.getElementById('product-image-upload').click()}
                  >
                    Choose Files
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4 mt-6 justify-center">
                  {productData.images && productData.images.length > 0 && productData.images.filter(img => img.url).map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded overflow-hidden border border-border bg-muted">
                      <img
                        src={img.url}
                        alt={img.name || `Product Image ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                        onClick={() => {
                          setProductData(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== idx)
                          }));
                        }}
                        title="Remove image"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>• Recommended size: 800x800px or larger</p>
                <p>• Supported formats: JPG, PNG, WebP</p>
                <p>• Maximum file size: 5MB per image</p>
                <p>• Upload up to 10 images per product</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave}>
            Save Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;