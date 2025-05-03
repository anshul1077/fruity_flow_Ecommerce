
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/services/productService';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add items to your cart",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    addToCart(product, 1);
  };
  
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-xl hover:-translate-y-1 animate-fade-in"
    >
      {/* Product Image */}
      <div className="relative h-60 overflow-hidden">
        {product.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-fruity-red z-10">
            {product.discount}% OFF
          </Badge>
        )}
        {product.featured && (
          <Badge variant="outline" className="absolute top-2 right-2 bg-fruity-yellow/70 text-black z-10">
            Featured
          </Badge>
        )}
        
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            onClick={handleAddToCart}
            className="btn-bounce bg-gradient-to-r from-fruity-green to-fruity-lightGreen scale-90 group-hover:scale-100 transition-transform"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-fruity-yellow flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < product.rating ? 'fill-fruity-yellow' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">({product.reviews})</span>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <h3 className="font-medium text-lg mb-1 truncate">{product.name}</h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 h-10 overflow-hidden">
          {product.description}
        </p>
        
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-baseline">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <span className="text-xs text-fruity-green">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
