
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";

const Checkout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  
  const subtotal = cartItems.reduce((total, item) => 
    total + (item.price * (1 - item.discount / 100) * item.quantity), 0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  // Calculate items count
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Process order
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    });
    
    // Clear cart and redirect to success page
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 1500);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Add some products to your cart before proceeding to checkout.
        </p>
        <Button onClick={() => navigate('/products')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Checkout</h1>
      <p className="text-muted-foreground mb-8">
        Complete your order by providing your shipping and payment details.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder}>
            {/* Shipping Information */}
            <div className="bg-card rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" required />
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" required />
              </div>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor="address">Street Address *</Label>
                <Input id="address" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input id="state" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip/Postal Code *</Label>
                  <Input id="zip" required />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-card rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit" className="flex items-center gap-2">
                    Credit Card
                    <span className="text-muted-foreground text-sm">(Visa, Mastercard, Amex)</span>
                  </Label>
                </div>
                
                {paymentMethod === "credit" && (
                  <div className="border rounded-md p-4 ml-6">
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC/CVV *</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="applepay" id="applepay" />
                  <Label htmlFor="applepay">Apple Pay</Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Additional Options */}
            <div className="bg-card rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Additional Options</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="saveInfo" />
                  <Label htmlFor="saveInfo" className="text-sm">
                    Save my information for faster checkout
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="subscribe" />
                  <Label htmlFor="subscribe" className="text-sm">
                    Email me about special offers and new products
                  </Label>
                </div>
              </div>
            </div>
            
            <Button type="submit" size="lg" className="w-full md:w-auto">
              Place Order
            </Button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-card rounded-lg p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item._id} className="flex gap-3">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium line-clamp-1">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium">
                      ${(item.price * (1 - item.discount / 100) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              {shipping === 0 && (
                <p className="text-sm text-green-600 mt-2">
                  You qualify for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
