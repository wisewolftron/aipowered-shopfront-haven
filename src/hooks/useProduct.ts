
import { useState, useEffect } from 'react';
import { ProductType } from '@/types';
import { products as mockProducts } from '@/data/products';

export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call to your backend
        // For this demo, we'll use mock data with a simulated delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const foundProduct = mockProducts.find(p => p._id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (productId) {
      fetchProduct();
    }
  }, [productId]);
  
  return { product, isLoading, error };
};
