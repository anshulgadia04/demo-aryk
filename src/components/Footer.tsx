import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Instagram, Music, Facebook, Youtube, ChevronUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium text-foreground mb-4">NEWSLETTER</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Sign up & save 15% on your first order
            </p>
            
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                className="border-b border-foreground rounded-none bg-transparent"
              />
              <div className="flex gap-2">
                <span className="text-sm bg-muted px-2 py-1 rounded">🇮🇳</span>
                <Input
                  type="tel"
                  placeholder="Phone"
                  className="border-b border-foreground rounded-none bg-transparent flex-1"
                />
              </div>
              
              <div className="flex items-start gap-2">
                <Checkbox id="consent" className="mt-1" />
                <label htmlFor="consent" className="text-xs text-muted-foreground">
                  I consent to receive SMS messages from ARYK Organics
                </label>
              </div>
              
              <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                SIGN UP
              </Button>
              
              <p className="text-xs text-muted-foreground">
                By joining, you agree to receive email marketing of the contacts provided. 
                Unsubscribe at any time. Consent is not a condition of purchase. 
                View our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">SHOP</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Best Sellers</a></li>
              <li><a href="#" className="hover:text-foreground">New</a></li>
              <li><a href="#" className="hover:text-foreground">Gifts + Sets</a></li>
              <li><a href="#" className="hover:text-foreground">Wellness + Tools</a></li>
              <li><a href="#" className="hover:text-foreground">Shop All</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">SUPPORT</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Shipping + Delivery</a></li>
              <li><a href="#" className="hover:text-foreground">Returns + Refund Policy</a></li>
              <li><a href="#" className="hover:text-foreground">FAQs</a></li>
              <li><a href="#" className="hover:text-foreground">Routine Builder</a></li>
              <li><a href="#" className="hover:text-foreground">Rewards</a></li>
              <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
              <li><a href="#" className="hover:text-foreground">Store Locations</a></li>
              <li><a href="#" className="hover:text-foreground">Live Consultations</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">COMPANY</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Our Story</a></li>
              <li><a href="#" className="hover:text-foreground">Certified Organic</a></li>
              <li><a href="#" className="hover:text-foreground">Sustainability</a></li>
              <li><a href="#" className="hover:text-foreground">Blog</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Certifications */}
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="text-xs text-muted-foreground">Certified Organic</div>
              <div className="text-xs text-muted-foreground">Climate Neutral Certified</div>
            </div>

            {/* Logo */}
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-serif font-bold text-foreground">ARYK ORGANICS</h2>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Music className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-4 border-t border-border">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 md:mb-0">
              <span>INDIA / ENGLISH</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>© ARYK ORGANICS 2025</span>
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
              <a href="#" className="hover:text-foreground">Accessibility</a>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              TO TOP
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;