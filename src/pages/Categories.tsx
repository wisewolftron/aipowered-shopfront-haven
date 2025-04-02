
import { useState } from 'react';
import { categories } from '@/data/categories';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Categories = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Browse Categories</h1>
      <p className="text-muted-foreground mb-8">
        Explore our wide range of product categories, carefully curated to meet your needs.
      </p>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="h-auto p-1">
            <TabsTrigger 
              value="all" 
              className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All Categories
            </TabsTrigger>
            <TabsTrigger 
              value="featured" 
              className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Featured
            </TabsTrigger>
            <TabsTrigger 
              value="popular" 
              className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Popular
            </TabsTrigger>
            <TabsTrigger 
              value="new" 
              className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              New Arrivals
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.slug}`}
                className="group"
              >
                <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="relative aspect-square">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                      <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <h3 className="font-medium text-center">{category.name}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="featured" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories
              .filter(cat => cat.featured)
              .map((category) => (
                <Link 
                  key={category.id} 
                  to={`/products?category=${category.slug}`}
                  className="group"
                >
                  <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="relative aspect-square">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                        <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <h3 className="font-medium text-center">{category.name}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="popular" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories
              .filter(cat => cat.popular)
              .map((category) => (
                <Link 
                  key={category.id} 
                  to={`/products?category=${category.slug}`}
                  className="group"
                >
                  <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="relative aspect-square">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                        <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <h3 className="font-medium text-center">{category.name}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories
              .filter(cat => cat.new)
              .map((category) => (
                <Link 
                  key={category.id} 
                  to={`/products?category=${category.slug}`}
                  className="group"
                >
                  <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="relative aspect-square">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                        <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <h3 className="font-medium text-center">{category.name}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Categories;
