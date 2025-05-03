
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, getProducts, Product } from '@/services/productService';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [fruitProducts, setFruitProducts] = useState<Product[]>([]);
  const [vegetableProducts, setVegetableProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load featured products
    setFeaturedProducts(getFeaturedProducts());
    
    // Get fruits and vegetables for categories section
    const allProducts = getProducts();
    setFruitProducts(allProducts.filter(p => p.category === 'fruit').slice(0, 4));
    setVegetableProducts(allProducts.filter(p => p.category === 'vegetable').slice(0, 4));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?q=80&w=2300&auto=format&fit=crop" 
            alt="Fresh Fruits and Vegetables" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Fresh From The Farm To Your Table
            </h1>
            <p className="text-xl text-white/90">
              Discover handpicked, organic fruits and vegetables delivered right to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/shop">
                <Button className="text-lg px-8 py-6 bg-fruity-green hover:bg-fruity-lightGreen btn-bounce">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="text-lg px-8 py-6 text-white border-white hover:bg-white/10 btn-bounce">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in">
              <div className="h-16 w-16 rounded-full bg-fruity-green/20 flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-fruity-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All our products are certified organic, fresh, and locally sourced.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="h-16 w-16 rounded-full bg-fruity-orange/20 flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-fruity-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Same-day delivery for orders placed before noon in selected areas.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.4s"}}>
              <div className="h-16 w-16 rounded-full bg-fruity-red/20 flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-fruity-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dedicated support team available 7 days a week to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Our handpicked selection of the freshest seasonal produce
              </p>
            </div>
            <Link to="/shop" className="mt-4 md:mt-0">
              <Button variant="outline" className="btn-bounce">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Shop By Category</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fruits Category */}
            <div className="rounded-2xl overflow-hidden shadow-lg relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800&auto=format&fit=crop" 
                alt="Fresh Fruits" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <h3 className="text-3xl font-bold text-white mb-2">Fresh Fruits</h3>
                <p className="text-white/80 mb-4 max-w-md">
                  Juicy, sweet, and bursting with flavor. Our selection of seasonal fruits.
                </p>
                <Link to="/category/fruit">
                  <Button className="bg-white text-black hover:bg-white/90 btn-bounce">
                    Shop Fruits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Vegetables Category */}
            <div className="rounded-2xl overflow-hidden shadow-lg relative animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&auto=format&fit=crop" 
                alt="Fresh Vegetables" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <h3 className="text-3xl font-bold text-white mb-2">Fresh Vegetables</h3>
                <p className="text-white/80 mb-4 max-w-md">
                  Crisp, nutritious, and farm-fresh. Our selection of quality vegetables.
                </p>
                <Link to="/category/vegetable">
                  <Button className="bg-white text-black hover:bg-white/90 btn-bounce">
                    Shop Vegetables
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Preview Products by Category */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Fruits Preview */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">Popular Fruits</h3>
                <Link to="/category/fruit" className="text-fruity-green hover:underline">
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fruitProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
            
            {/* Vegetables Preview */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">Popular Vegetables</h3>
                <Link to="/category/vegetable" className="text-fruity-green hover:underline">
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vegetableProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop" 
                    alt="Customer" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 text-fruity-yellow fill-fruity-yellow" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The quality of fruits I receive from FruityFlow is outstanding. 
                Everything is always fresh and tastes amazing. Their delivery is also very prompt!"
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop" 
                    alt="Customer" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 text-fruity-yellow fill-fruity-yellow" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "As a chef, I'm very particular about my ingredients. FruityFlow consistently delivers the 
                freshest produce that makes all the difference in my cooking."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.4s"}}>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop" 
                    alt="Customer" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-4 w-4 ${i < 4 ? 'text-fruity-yellow fill-fruity-yellow' : 'text-gray-300'}`} viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "I've been a regular customer for over a year now. Their subscription service is convenient, 
                and the quality is consistently good. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-fruity-green">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-white mb-8 lg:mb-0 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Enjoy Fresh Goodness?</h2>
              <p className="text-white/80 text-lg">
                Sign up today and get 15% off your first order. Fresh fruits and vegetables 
                delivered to your doorstep.
              </p>
            </div>
            <Link to="/signup">
              <Button className="bg-white text-fruity-green hover:bg-white/90 text-lg px-8 py-6 btn-bounce">
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
