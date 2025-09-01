import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductCategoriesSection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/product-catalog-search', { state: { category } });
  };

  const categories = [
    {
      id: 'solar-panels',
      name: 'Solar Panels',
      description: 'High-efficiency photovoltaic panels from leading manufacturers worldwide',
      productCount: '12,500+',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Sun',
      features: ['Monocrystalline', 'Polycrystalline', 'Thin Film', 'Bifacial']
    },
    {
      id: 'batteries',
      name: 'Energy Storage',
      description: 'Advanced battery systems for residential and commercial energy storage',
      productCount: '8,200+',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Battery',
      features: ['Lithium-ion', 'Lead Acid', 'Flow Batteries', 'Hybrid Systems']
    },
    {
      id: 'inverters',
      name: 'Inverters',
      description: 'Power conversion systems for optimal energy efficiency and grid integration',
      productCount: '6,800+',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Zap',
      features: ['String Inverters', 'Microinverters', 'Power Optimizers', 'Hybrid Inverters']
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Explore Our Product Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover a comprehensive range of energy products from verified suppliers. 
            From residential solar solutions to commercial energy storage systems.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((category) => (
            <div
              key={category?.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-modal transition-all duration-300 hover:-translate-y-1"
            >
              {/* Category Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 bg-white"
                />
                {/* Remove dark overlay for better image visibility */}
                {/* Icon Overlay - add white background for contrast */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 border border-gray-200 rounded-lg flex items-center justify-center shadow-md">
                  <Icon name={category?.icon} size={28} className="text-primary" />
                </div>

                {/* Product Count Badge */}
                <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {category?.productCount} Products
                </div>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {category?.name}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {category?.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {category?.features?.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Browse Button */}
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleCategoryClick(category?.id)}
                  className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  Browse {category?.name}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories */}
        <div className="text-center mt-12">
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate('/product-catalog-search')}
            className="px-8"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategoriesSection;