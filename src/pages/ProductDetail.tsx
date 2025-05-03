
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getProducts, Product } from '@/services/productService';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { 
  Minus, 
  Plus, 
  ChevronLeft, 
  ShoppingCart, 
  Heart, 
  Star,
  Share2,
  Check
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      if (id) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const fetchedProduct = getProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          
          // Get related products (same category)
          const allProducts = getProducts();
          const related = allProducts
            .filter(p => p.category === fetchedProduct.category && p.id !== fetchedProduct.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      }
      setIsLoading(false);
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };
  
  const handleAddToWishlist = () => {
    setAddedToWishlist(!addedToWishlist);
    toast({
      title: addedToWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      description: addedToWishlist ? 'Product has been removed from your wishlist.' : 'Product has been added to your wishlist.',
    });
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'Check out this product',
        text: product?.description || 'I found this amazing product!',
        url: window.location.href,
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied',
        description: 'Product link has been copied to clipboard.',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-6xl px-4">
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">The product you're looking for does not exist or has been removed.</p>
          <Link to="/shop">
            <Button className="bg-fruity-green hover:bg-fruity-lightGreen btn-bounce">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="container py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Link to="/" className="hover:text-fruity-green">Home</Link>
          <span className="mx-2">→</span>
          <Link to="/shop" className="hover:text-fruity-green">Shop</Link>
          <span className="mx-2">→</span>
          <Link to={`/category/${product.category}`} className="hover:text-fruity-green capitalize">
            {product.category}
          </Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900 dark:text-gray-200">{product.name}</span>
        </div>
        
        {/* Product Detail */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-12 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] bg-gray-100 dark:bg-gray-900">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {/* Category Badge */}
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                product.category === 'fruit' ? 'bg-fruity-orange' : 'bg-fruity-green'
              }`}>
                {product.category === 'fruit' ? 'Fruit' : 'Vegetable'}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-6 md:p-8 flex flex-col">
              <Link to="/shop" className="inline-flex items-center text-fruity-green mb-4 self-start hover:text-fruity-lightGreen transition-colors">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to products
              </Link>
              
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              {/* Ratings */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'text-fruity-yellow fill-fruity-yellow' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.rating} rating)
                </span>
              </div>
              
              {/* Price */}
              <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>
              
              {/* Short Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {product.description}
              </p>
              
              {/* Add to Cart */}
              <div className="mt-auto space-y-4">
                {product.inStock ? (
                  <>
                    <div className="flex items-center text-sm">
                      <span className="flex items-center text-green-600 dark:text-green-500 mr-2">
                        <Check className="h-4 w-4 mr-1" /> In Stock
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        | Same-day delivery available
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 items-center">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-md"
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 border-l border-r border-gray-300 dark:border-gray-700">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-md"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <Button
                        onClick={handleAddToCart}
                        className="flex-grow sm:flex-grow-0 bg-gradient-to-r from-fruity-green to-fruity-lightGreen btn-bounce"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                      </Button>
                      
                      {/* Wishlist & Share Buttons */}
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className={`rounded-full ${addedToWishlist ? 'text-red-500 hover:text-red-600' : ''}`}
                          onClick={handleAddToWishlist}
                        >
                          <Heart className={`h-5 w-5 ${addedToWishlist ? 'fill-red-500' : ''}`} />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                          onClick={handleShare}
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400">This product is currently out of stock.</p>
                    <Button variant="outline" className="mt-2">
                      Notify Me When Available
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto scrollbar-none">
              <button
                className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                  activeTab === 'description'
                    ? 'border-fruity-green text-fruity-green'
                    : 'border-transparent hover:text-fruity-green'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                  activeTab === 'nutrition'
                    ? 'border-fruity-green text-fruity-green'
                    : 'border-transparent hover:text-fruity-green'
                }`}
                onClick={() => setActiveTab('nutrition')}
              >
                Nutrition Facts
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-fruity-green text-fruity-green'
                    : 'border-transparent hover:text-fruity-green'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                  activeTab === 'shipping'
                    ? 'border-fruity-green text-fruity-green'
                    : 'border-transparent hover:text-fruity-green'
                }`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping & Returns
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose prose-sm max-w-none dark:prose-invert animate-fade-in">
                  <p className="mb-4">
                    {product.description} Our {product.name.toLowerCase()} are sourced from local farms that follow sustainable 
                    farming practices. Each {product.category} is carefully harvested at the peak of 
                    ripeness to ensure maximum flavor and nutritional value.
                  </p>
                  <p className="mb-4">
                    We pay special attention to the quality of our produce, conducting regular tests 
                    and inspections to ensure that only the best reaches our customers. Our farmers 
                    use minimal pesticides and focus on organic growing methods whenever possible.
                  </p>
                  <p>
                    Store in a cool, dry place. For {product.category === 'fruit' ? 'fruits' : 'vegetables'}, 
                    refrigeration is recommended to maintain freshness for longer periods.
                  </p>
                </div>
              )}
              
              {activeTab === 'nutrition' && (
                <div className="animate-fade-in">
                  <h3 className="font-semibold mb-4">Nutrition Information</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-4">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Serving Size: 100g
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Calories</span>
                        <span>{product.nutrition.calories} kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protein</span>
                        <span>{product.nutrition.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carbohydrates</span>
                        <span>{product.nutrition.carbs}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fat</span>
                        <span>{product.nutrition.fat}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fiber</span>
                        <span>{product.nutrition.fiber}g</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
                  </p>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold">Customer Reviews</h3>
                    <Button className="bg-fruity-green hover:bg-fruity-lightGreen">Write a Review</Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <div className="flex items-start mb-2">
                        <div className="h-10 w-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop" 
                            alt="Reviewer" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">John D.</h4>
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < 5 ? 'text-fruity-yellow fill-fruity-yellow' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">2 weeks ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        Great quality and freshness! The {product.name.toLowerCase()} arrived perfectly ripe and 
                        tasted amazing. Will definitely be ordering again. The packaging was also excellent, 
                        keeping everything fresh during delivery.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <div className="flex items-start mb-2">
                        <div className="h-10 w-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop" 
                            alt="Reviewer" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">Sarah M.</h4>
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < 4 ? 'text-fruity-yellow fill-fruity-yellow' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">1 month ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        I've been ordering these {product.category === 'fruit' ? 'fruits' : 'vegetables'} for a while now 
                        and they consistently deliver good quality. The taste is much better than what I 
                        find at the supermarket. Highly recommended!
                      </p>
                    </div>
                    
                    <Button variant="outline" className="w-full">Load More Reviews</Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'shipping' && (
                <div className="animate-fade-in">
                  <h3 className="font-semibold mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Delivery Options</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        We offer same-day delivery for orders placed before 12 PM in select areas. 
                        Standard delivery takes 1-2 business days. All produce is carefully packed 
                        to ensure freshness during transit.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Returns Policy</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        If you're not satisfied with the quality of your produce, please contact us 
                        within 24 hours of delivery with photos. We'll arrange a replacement or refund.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Shipping Costs</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Free delivery on orders over $25. Otherwise, a $4.99 shipping fee applies.
                        Premium delivery (guaranteed within 2 hours) is available for $9.99.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
