
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, RefreshCw, ShoppingCart, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const discount = promoApplied ? (subtotal * promoDiscount) : 0;
  const total = subtotal + shipping - discount;
  
  const handleQuantityChange = (productId: string, delta: number) => {
    const item = cartItems.find(item => item._id === productId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      updateCartItemQuantity(productId, newQuantity);
    }
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleApplyPromo = () => {
    // This is a mock promo code
    if (promoCode === 'SAVE20') {
      setPromoApplied(true);
      setPromoDiscount(0.2); // 20% discount
    }
  };
  
  const handleCheckout = () => {
    // Here we would implement checkout logic
    // For now, just navigate to a dummy checkout page
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="rounded-full bg-muted h-24 w-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartItems.length})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Cart Items</h2>
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-destructive" 
                onClick={clearCart}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
            </div>
            
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="h-20 w-20 bg-muted rounded-md overflow-hidden">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <Link 
                      to={`/products/${item._id}`} 
                      className="font-medium hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <span className="text-sm text-muted-foreground mb-2">
                      ${item.price.toFixed(2)} each
                    </span>
                    
                    <div className="flex items-center mt-auto">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-md"
                        onClick={() => handleQuantityChange(item._id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-md"
                        onClick={() => handleQuantityChange(item._id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between h-full">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" asChild>
                <Link to="/products">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (20%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Promo code" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                />
                <Button 
                  variant="outline" 
                  onClick={handleApplyPromo}
                  disabled={promoApplied || !promoCode}
                >
                  Apply
                </Button>
              </div>
              {promoApplied && (
                <p className="text-green-600 text-sm mt-2">Promo code SAVE20 applied successfully!</p>
              )}
            </div>
            
            <Button className="w-full mb-4" size="lg" onClick={handleCheckout}>
              <CreditCard className="mr-2 h-4 w-4" />
              Proceed to Checkout
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">We accept</p>
              <div className="flex justify-center space-x-2">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/196/196578.png" 
                  alt="Visa" 
                  className="h-6 w-auto grayscale opacity-70" 
                />
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/196/196561.png" 
                  alt="MasterCard" 
                  className="h-6 w-auto grayscale opacity-70" 
                />
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/196/196565.png" 
                  alt="PayPal" 
                  className="h-6 w-auto grayscale opacity-70" 
                />
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/5968/5968220.png" 
                  alt="Apple Pay" 
                  className="h-6 w-auto grayscale opacity-70" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
