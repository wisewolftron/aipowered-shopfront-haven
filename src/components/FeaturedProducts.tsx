
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { ProductType } from '@/types';
import { useProducts } from '@/hooks/useProducts';

const FeaturedProducts = () => {
  const { products, isLoading, error } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  
  useEffect(() => {
    if (products.length > 0) {
      // For demonstration purposes, we're showing a subset of all products
      setFeaturedProducts(products.slice(0, 4));
    }
  }, [products]);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="product-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="product-card animate-pulse">
                <div className="aspect-square bg-muted"></div>
                <div className="p-4">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-destructive mb-4">Failed to load products. Please try again later.</p>
          <Button variant="outline">Retry</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Products</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Discover our curated selection of premium products, enhanced with AI-powered recommendations tailored to your preferences.
        </p>
        
        <div className="product-grid mb-10">
          {featuredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild>
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
