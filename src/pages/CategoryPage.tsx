
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory, Product } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const CategoryPage = () => {
  const { category } = useParams<{ category: 'fruit' | 'vegetable' }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (category) {
        const categoryProducts = getProductsByCategory(category as 'fruit' | 'vegetable');
        setProducts(categoryProducts);
      }
      
      setIsLoading(false);
    };
    
    fetchProducts();
  }, [category]);

  const categoryTitle = category === 'fruit' ? 'Fresh Fruits' : 'Fresh Vegetables';
  const categoryDescription = category === 'fruit' 
    ? 'Explore our selection of fresh, seasonal fruits. From juicy berries to tropical delights, we have it all.' 
    : 'Discover our variety of farm-fresh vegetables. From leafy greens to root vegetables, all sourced from local farms.';
  const categoryImage = category === 'fruit'
    ? 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&auto=format&fit=crop'
    : 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=1200&auto=format&fit=crop';

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        <img 
          src={categoryImage}
          alt={categoryTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center container">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-fade-in">
            {categoryTitle}
          </h1>
          <p className="text-white/90 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {categoryDescription}
          </p>
        </div>
      </div>
      
      <div className="container py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Link to="/" className="hover:text-fruity-green">Home</Link>
          <span className="mx-2">→</span>
          <Link to="/shop" className="hover:text-fruity-green">Shop</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900 dark:text-gray-200 capitalize">{category}</span>
        </div>
        
        {/* Back to Shop */}
        <Link to="/shop" className="inline-flex items-center text-fruity-green mb-6 hover:text-fruity-lightGreen transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to all products
        </Link>
        
        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
                <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We couldn't find any {category === 'fruit' ? 'fruits' : 'vegetables'} at the moment.
            </p>
            <Link to="/shop">
              <Button className="bg-fruity-green hover:bg-fruity-lightGreen">
                Browse All Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
