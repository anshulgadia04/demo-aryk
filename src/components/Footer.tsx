import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Instagram, Music, Facebook, Youtube, ChevronUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Footer = () => {
  const { elementRef: footerRef, isVisible: isFooterVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <footer 
      ref={footerRef}
      className="bg-background border-t border-border"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Newsletter */}
          <div 
            className={`md:col-span-1 transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              isFooterVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-8'
            }`}
          >
            <h3 className={`text-lg font-medium text-foreground mb-4 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-200 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              NEWSLETTER
            </h3>
            <p className={`text-sm text-muted-foreground mb-6 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-300 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              Sign up & save 15% on your first order
            </p>
            
            <div className="space-y-4">
              <div className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-400 ${
                isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
              }`}>
                <Input
                  type="email"
                  placeholder="Email"
                  className="border-b border-foreground rounded-none bg-transparent transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus:border-primary focus:border-opacity-100 focus:scale-[1.02]"
                />
              </div>
              
              <div className={`flex gap-2 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-500 ${
                isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
              }`}>
                <span className="text-sm bg-muted px-2 py-1 rounded transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:bg-primary/10">🇮🇳</span>
                <Input
                  type="tel"
                  placeholder="Phone"
                  className="border-b border-foreground rounded-none bg-transparent flex-1 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus:border-primary focus:border-opacity-100 focus:scale-[1.02]"
                />
              </div>
              
              <div className={`flex items-start gap-2 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-600 ${
                isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
              }`}>
                <Checkbox id="consent" className="mt-1 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:border-primary" />
                <label htmlFor="consent" className="text-xs text-muted-foreground">
                  I consent to receive SMS messages from ARYK Organics
                </label>
              </div>
              
              <div className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-700 ${
                isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
              }`}>
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.02] hover:shadow-lg">
                  SIGN UP
                </Button>
              </div>
              
              <p className={`text-xs text-muted-foreground transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-800 ${
                isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
              }`}>
                By joining, you agree to receive email marketing of the contacts provided. 
                Unsubscribe at any time. Consent is not a condition of purchase. 
                View our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>

          {/* Shop Links */}
          <div 
            className={`transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-200 ${
              isFooterVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-8'
            }`}
          >
            <h3 className={`text-lg font-medium text-foreground mb-4 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-300 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              SHOP
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "Best Sellers",
                "New",
                "Gifts + Sets", 
                "Wellness + Tools",
                "Shop All"
              ].map((item, index) => (
                <li key={item} className={`transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-${400 + index * 150} ${
                  isFooterVisible ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-4'
                }`}>
                  <a href="#" className="hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:translate-x-1 hover:scale-[1.02] inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div 
            className={`transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-300 ${
              isFooterVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-8'
            }`}
          >
            <h3 className={`text-lg font-medium text-foreground mb-4 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-400 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              SUPPORT
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "Shipping + Delivery",
                "Returns + Refund Policy",
                "FAQs",
                "Routine Builder",
                "Rewards",
                "Contact Us",
                "Store Locations",
                "Live Consultations"
              ].map((item, index) => (
                <li key={item} className={`transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-${500 + index * 150} ${
                  isFooterVisible ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-4'
                }`}>
                  <a href="#" className="hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:translate-x-1 hover:scale-[1.02] inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div 
            className={`transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-400 ${
              isFooterVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-8'
            }`}
          >
            <h3 className={`text-lg font-medium text-foreground mb-4 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-500 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              COMPANY
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "Our Story",
                "Certified Organic",
                "Sustainability",
                "Blog",
                "Careers"
              ].map((item, index) => (
                <li key={item} className={`transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-${600 + index * 150} ${
                  isFooterVisible ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-4'
                }`}>
                  <a href="#" className="hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:translate-x-1 hover:scale-[1.02] inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div 
          className={`border-t border-border mt-12 pt-8 transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-500 ${
            isFooterVisible 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-8'
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Certifications */}
            <div className={`flex items-center gap-4 mb-4 md:mb-0 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-600 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              <div className="text-xs text-muted-foreground transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-foreground hover:scale-105 hover:bg-primary/5 px-2 py-1 rounded">
                Certified Organic
              </div>
              <div className="text-xs text-muted-foreground transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-foreground hover:scale-105 hover:bg-primary/5 px-2 py-1 rounded">
                Climate Neutral Certified
              </div>
            </div>

            {/* Logo */}
            <div className={`mb-4 md:mb-0 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-700 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              <h2 className="text-2xl font-serif font-bold text-foreground transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-primary hover:scale-105">
                ARYK ORGANICS
              </h2>
            </div>

            {/* Social Icons */}
            <div className={`flex items-center gap-4 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-800 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Music, label: "Music" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "Youtube" }
              ].map((social, index) => (
                <Button 
                  key={social.label}
                  variant="ghost" 
                  size="icon" 
                  className={`transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:text-primary hover:bg-primary/5 hover:shadow-md`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className={`flex flex-col md:flex-row justify-between items-center mt-8 pt-4 border-t border-border transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-900 ${
            isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
          }`}>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 md:mb-0">
              <span className="transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-foreground hover:scale-105 hover:bg-primary/5 px-2 py-1 rounded">
                INDIA / ENGLISH
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>© ARYK ORGANICS 2025</span>
              {[
                "Privacy Policy",
                "Terms of Service", 
                "Accessibility"
              ].map((item, index) => (
                <a 
                  key={item}
                  href="#" 
                  className="hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:translate-x-1 hover:scale-[1.02] inline-block"
                >
                  {item}
                </a>
              ))}
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:text-primary hover:bg-primary/5 hover:shadow-md"
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