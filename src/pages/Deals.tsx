
import { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from "@/components/ui/skeleton";

const Deals = () => {
  const { products, isLoading } = useProducts();
  const [dealProducts, setDealProducts] = useState([]);
  
  useEffect(() => {
    if (products) {
      // Filter products with discounts greater than 0
      const productsWithDeals = products.filter(product => product.discount > 0);
      setDealProducts(productsWithDeals);
    }
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Special Deals & Discounts</h1>
      <p className="text-muted-foreground mb-8">
        Discover our best offers and save big on quality products
      </p>
      
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {dealProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dealProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium mb-2">No deals available at the moment</h3>
              <p className="text-muted-foreground mb-6">
                Check back soon for new exciting offers and discounts!
              </p>
              <a href="/products" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                View All Products
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Deals;
