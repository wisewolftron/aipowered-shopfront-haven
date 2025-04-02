
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  ShoppingCart,
  ChevronRight,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { useProduct } from '@/hooks/useProduct';
import { useCart } from '@/contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, isLoading, error } = useProduct(id || '');
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showAIDescription, setShowAIDescription] = useState(false);
  
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      
      toast({
        title: "Added to cart",
        description: `${product.name} x${quantity} has been added to your cart.`,
        duration: 3000,
      });
    }
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product?.name} has been added to your wishlist.`,
      duration: 3000,
    });
  };
  
  const handleShare = () => {
    try {
      navigator.share({
        title: product?.name,
        text: product?.shortDescription,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback for browsers that don't support the Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard.",
        duration: 3000,
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-muted rounded-lg"></div>
            <div>
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-muted rounded w-full mb-3"></div>
              <div className="h-4 bg-muted rounded w-full mb-3"></div>
              <div className="h-4 bg-muted rounded w-2/3 mb-6"></div>
              <div className="h-12 bg-muted rounded w-1/3 mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8 text-muted-foreground">
        <span className="hover:text-primary cursor-pointer" onClick={() => navigate('/')}>Home</span>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="hover:text-primary cursor-pointer" onClick={() => navigate('/products')}>Products</span>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="hover:text-primary cursor-pointer" onClick={() => navigate(`/categories/${product.category}`)}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </span>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">{product.name}</span>
      </div>
      
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div>
          <Carousel className="w-full max-w-md mx-auto">
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src={image} 
                      alt={`${product.name} - View ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          
          <div className="flex mt-4 gap-2 justify-center">
            {product.images.slice(0, 4).map((image, index) => (
              <div 
                key={index}
                className="w-16 h-16 border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} ({product.reviews.length} reviews)
            </span>
          </div>
          
          {/* Short Description */}
          <p className="text-muted-foreground mb-6">
            {product.shortDescription}
          </p>
          
          {/* Price */}
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                </span>
                <Badge className="bg-destructive hover:bg-destructive">
                  {product.discount}% OFF
                </Badge>
              </>
            )}
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              
              <span className="ml-4 text-sm text-muted-foreground">
                {product.stock} available
              </span>
            </div>
          </div>
          
          {/* Add to Cart / Buy Now */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button 
              className="flex-1 gap-2" 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </Button>
          </div>
          
          {/* Wishlist & Share */}
          <div className="flex space-x-4 mb-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddToWishlist}
              className="gap-2"
            >
              <Heart className="h-4 w-4" />
              Add to Wishlist
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShare}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
          
          {/* Shipping Info */}
          <div className="bg-muted/40 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3 mb-3">
              <Truck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-sm text-muted-foreground">
                  Free standard shipping on orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 mb-3">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Secure Payment</h4>
                <p className="text-sm text-muted-foreground">
                  SSL / Secure Payment Protection
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">30 Days Return</h4>
                <p className="text-sm text-muted-foreground">
                  30 days money back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs 
          defaultValue="description" 
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="pt-2">
            <div className="prose max-w-none">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Product Description</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAIDescription(!showAIDescription)}
                >
                  {showAIDescription ? "Show Original" : "Show AI-Enhanced"}
                </Button>
              </div>
              
              {showAIDescription ? (
                <div className="bg-muted/40 p-6 rounded-lg border border-primary/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary/10 px-2 py-1 text-xs font-medium text-primary rounded-bl-lg">
                    AI-Enhanced
                  </div>
                  <h3 className="text-lg font-medium mb-2">Personalized Description</h3>
                  <p className="mb-4">
                    {product.aiDescription}
                  </p>
                  <div className="text-sm text-muted-foreground mt-4">
                    <p>This AI-enhanced description is generated based on product specifications, user reviews, and your browsing history to highlight features most relevant to you.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>{product.description}</p>
                </div>
              )}
              
              {/* Features */}
              <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="pt-2">
            <h2 className="text-2xl font-bold mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/40 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">General Information</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).slice(0, Math.ceil(Object.entries(product.specifications).length / 2)).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-muted/40 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).slice(Math.ceil(Object.entries(product.specifications).length / 2)).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              <Button>Write a Review</Button>
            </div>
            
            {/* Review Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-muted/40 p-6 rounded-lg col-span-1">
                <div className="flex items-center justify-center flex-col">
                  <h3 className="text-5xl font-bold mb-2">{product.rating.toFixed(1)}</h3>
                  <div className="flex mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {product.reviews.length} reviews
                  </p>
                </div>
              </div>
              
              <div className="col-span-2">
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const rating = 5 - i;
                    const count = product.reviews.filter(r => Math.floor(r.rating) === rating).length;
                    const percentage = product.reviews.length > 0 
                      ? Math.round((count / product.reviews.length) * 100) 
                      : 0;
                    
                    return (
                      <div key={rating} className="flex items-center">
                        <div className="flex items-center gap-1 w-16">
                          <span className="text-sm">{rating}</span>
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5 mx-2">
                          <div 
                            className="bg-yellow-400 h-2.5 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-10">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            {/* Review List */}
            <div className="space-y-8">
              {product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="border-b border-border last:border-0 pb-8 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review.userAvatar} />
                          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{review.userName}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{new Date(review.date).toLocaleDateString()}</span>
                            <span className="mx-2">•</span>
                            <span>Verified Purchase</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2">{review.title}</h4>
                    <p className="text-muted-foreground mb-4">{review.comment}</p>
                    
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((image, idx) => (
                          <div key={idx} className="w-16 h-16 rounded-md overflow-hidden">
                            <img 
                              src={image} 
                              alt={`Review ${index + 1} image ${idx + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 mt-4">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful ({review.helpful || 0})</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ThumbsDown className="h-4 w-4" />
                        <span>Not Helpful</span>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Be the first to review this product.
                  </p>
                  <Button>Write a Review</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
