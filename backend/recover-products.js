// Recovery script to add back previously created products
const previouslyCreatedProducts = [
  {
    id: Date.now() - 10000, // Use a timestamp from earlier
    name: 'SolarMax 400W Monocrystalline Panel',
    brand: 'SolarMax',
    sku: 'SMX-400W-MONO',
    category: 'solar-panels',
    description: 'High-efficiency 400W monocrystalline solar panel with durable glass and anti-reflective coating. Ideal for residential rooftops.',
    specifications: {
      power: '600',
      voltage: '30',
      efficiency: '30',
      warranty: '3',
      dimensions: '2108 × 1048 × 40 mm',
      weight: '50'
    },
    pricing: {
      basePrice: '399.99',
      bulkPricing: [
        { quantity: 10, discount: 5 },
        { quantity: 50, discount: 10 },
        { quantity: 100, discount: 15 }
      ]
    },
    inventory: {
      stock: '3000',
      lowStockThreshold: '50',
      trackInventory: true
    },
    image: 'http://localhost:5000/uploads/1757328201371-556499335-yyu.jpg',
    images: ['http://localhost:5000/uploads/1757328201371-556499335-yyu.jpg'],
    price: 399.99,
    stock: 3000,
    status: 'active',
    featured: true,
    seller: 'EnergyHub Seller',
    inStock: true,
    stockCount: 3000,
    created_at: new Date(Date.now() - 10000).toISOString(),
    updated_at: new Date(Date.now() - 10000).toISOString()
  }
];

module.exports = previouslyCreatedProducts;
