
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-accent/5 py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Content */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Discover the future of <span className="text-primary">shopping</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto md:mx-0">
            Explore our AI-enhanced product catalog and experience a new way to shop online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative md:absolute md:top-0 md:right-0 max-w-xl">
            <div className="relative mx-auto md:mx-0 aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Shopping Experience" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/20 rounded-full -z-10"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary/60 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
