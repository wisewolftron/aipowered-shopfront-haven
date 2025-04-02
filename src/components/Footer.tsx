
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">ShopHub</h3>
            <p className="text-muted-foreground mb-4">
              Your trusted destination for innovative products, curated with quality and style in mind.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/deals" className="text-muted-foreground hover:text-primary transition-colors">Deals & Offers</Link></li>
              <li><Link to="/new-arrivals" className="text-muted-foreground hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/best-sellers" className="text-muted-foreground hover:text-primary transition-colors">Best Sellers</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/shipping-policy" className="text-muted-foreground hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">123 E-Commerce St, Digital City, 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">support@shophub.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-6 mt-6 border-t border-muted-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} ShopHub. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/196/196578.png" 
                alt="Visa" 
                className="h-8 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity" 
              />
              <img 
                src="https://cdn-icons-png.flaticon.com/512/196/196561.png" 
                alt="MasterCard" 
                className="h-8 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity" 
              />
              <img 
                src="https://cdn-icons-png.flaticon.com/512/196/196565.png" 
                alt="PayPal" 
                className="h-8 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity" 
              />
              <img 
                src="https://cdn-icons-png.flaticon.com/512/5968/5968220.png" 
                alt="Apple Pay" 
                className="h-8 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity" 
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
