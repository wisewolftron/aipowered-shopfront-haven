
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductType } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Wishlist functionality will be implemented later
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
      duration: 3000,
    });
  };

  return (
    <div className="product-card group animate-scale-in">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="product-image transition-transform duration-300 group-hover:scale-105"
          />
          
          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-destructive hover:bg-destructive">
              {product.discount}% OFF
            </Badge>
          )}
          
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <Button 
              size="icon" 
              variant="outline" 
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={handleWishlist}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
            <Button 
              className="w-full gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">({product.reviews.length})</span>
          </div>
          
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {product.shortDescription}
          </p>
          
          <div className="flex items-center space-x-2 mt-2">
            <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ${(product.price * (1 + product.discount / 100)).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
