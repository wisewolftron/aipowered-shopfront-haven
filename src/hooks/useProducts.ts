
import { useState, useEffect } from 'react';
import { ProductType } from '@/types';
import { products as mockProducts } from '@/data/products';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call to your backend
        // For this demo, we'll use mock data with a simulated delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProducts(mockProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  return { products, isLoading, error };
};
