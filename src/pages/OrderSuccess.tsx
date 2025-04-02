
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderSuccess = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="bg-card rounded-lg p-8 shadow-sm max-w-2xl w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        
        <h1 className="text-3xl font-bold mb-2">Order Successful!</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Thank you for your purchase
        </p>
        
        <div className="bg-muted rounded-md p-4 mb-8">
          <p className="text-sm text-muted-foreground mb-1">Order Number</p>
          <p className="text-lg font-medium">{orderNumber}</p>
        </div>
        
        <p className="mb-8 text-muted-foreground">
          We've sent a confirmation email to your inbox with your order details. 
          Your order will be processed and shipped shortly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
