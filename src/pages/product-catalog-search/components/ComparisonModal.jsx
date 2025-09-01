import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonModal = ({ isOpen, onClose, products }) => {
  if (!isOpen || !products || products.length === 0) return null;
  // Example fields to compare
  const fields = [
    { label: 'Image', key: 'image', type: 'image' },
    { label: 'Name', key: 'name' },
    { label: 'Brand', key: 'seller' },
    { label: 'Price', key: 'price', prefix: '$' },
    { label: 'Rating', key: 'rating', icon: 'Star' },
    { label: 'Stock', key: 'inStock', render: v => v ? 'In Stock' : 'Out of Stock' },
    { label: 'Badge', key: 'badge' },
    // Add more fields as needed
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-[90vw] max-h-[90vh] p-6 relative animate-fade-in overflow-auto flex flex-col">
        <button className="absolute top-4 right-4 text-muted-foreground hover:text-primary" onClick={onClose}>
          <Icon name="X" size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Product Comparison</h2>
  <table className="w-full border-separate border-spacing-y-4">
          <tbody>
            {fields.map(field => (
              <tr key={field.key}>
                <td className="font-semibold text-right pr-4 align-top text-muted-foreground w-32">{field.label}</td>
                {products.map((product, idx) => (
                  <td key={idx} className="bg-background rounded-lg px-4 py-2 text-center align-top">
                    {field.type === 'image' ? (
                      <Image src={product[field.key]} alt={product.name} className="w-20 h-20 object-contain mx-auto rounded-md" />
                    ) : field.icon ? (
                      <span className="flex items-center justify-center gap-1">
                        <Icon name={field.icon} size={14} className="text-warning" />
                        {product[field.key]}
                      </span>
                    ) : field.render ? (
                      field.render(product[field.key])
                    ) : field.prefix ? (
                      <span>{field.prefix}{product[field.key]}</span>
                    ) : (
                      product[field.key] || '-'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
