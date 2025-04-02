
import { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductType } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from '@/data/categories';

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating: High to Low", value: "rating_desc" },
  { label: "Popularity", value: "popularity" },
];

const Products = () => {
  const { products, isLoading, error } = useProducts();
  const [displayedProducts, setDisplayedProducts] = useState<ProductType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("newest");
  
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.shortDescription.toLowerCase().includes(query)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => 
        selectedCategories.includes(p.category)
      );
    }
    
    // Sort
    switch (selectedSort) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating_desc":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        filtered.sort((a, b) => b.reviews.length - a.reviews.length);
        break;
      default:
        break;
    }
    
    setDisplayedProducts(filtered);
  }, [products, searchQuery, priceRange, selectedCategories, selectedSort]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedSort("newest");
  };
  
  const renderFilters = () => (
    <>
      {/* Search */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Search</h3>
        <Input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Price Range</h3>
        <Slider
          defaultValue={[0, 1000]}
          value={priceRange}
          min={0}
          max={1000}
          step={10}
          onValueChange={handlePriceChange}
          className="my-6"
        />
        <div className="flex justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <Button onClick={clearFilters} variant="outline" className="w-full mt-6">
        Clear Filters
      </Button>
    </>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Loading products...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
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
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Error Loading Products</h1>
        <p className="text-destructive mb-4">{error}</p>
        <Button>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">All Products</h1>
      <p className="text-muted-foreground mb-8">
        Explore our wide range of products, enhanced with AI-powered descriptions.
      </p>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block w-64 h-fit sticky top-24">
          {renderFilters()}
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {/* Mobile Filter & Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your product search with these filters.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    {renderFilters()}
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="text-sm text-muted-foreground">
                {displayedProducts.length} {displayedProducts.length === 1 ? 'product' : 'products'} found
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm mr-2 text-muted-foreground hidden sm:inline-block">Sort by:</span>
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Product Grid */}
          {displayedProducts.length > 0 ? (
            <div className="product-grid">
              {displayedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
