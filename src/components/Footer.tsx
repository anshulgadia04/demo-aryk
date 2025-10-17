import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Youtube, ChevronUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const { elementRef: footerRef, isVisible: isFooterVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Signup button removed from footer

  return (
    <footer 
      ref={footerRef}
      className="bg-background border-t border-border"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ARYK Brand Info (replaces Newsletter) */}
          <div 
            className={`md:col-span-1 transition-all duration-1200 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] ${
              isFooterVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-8'
            }`}
          >
            <div className={`transition-all duration-1000 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-200 text-center ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              <button onClick={() => navigate('/')} className="p-0 bg-transparent border-0">
                <img src="/logo-dark.svg" alt="Aryk logo" className="h-16 w-auto mx-auto" />
              </button>
            </div>
            <p className={`text-sm text-muted-foreground mt-10 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-300 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              Natural Beauty, Naturally You. Clean, organic skincare crafted with care.
            </p>
            <div className={`mt-6 space-y-2 text-sm transition-all duration-1000 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-400 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              <div className="text-muted-foreground">Customer Care: support@arykorganics.com</div>
              <div className="text-muted-foreground">Hours: Mon–Fri, 9am–6pm IST</div>
              <div className="text-muted-foreground">Made in India • Sustainably Sourced</div>
            </div>
          </div>

          {/* Shop Links */}
          <div 
            className={`transition-all duration-1200 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-200 ${
              isFooterVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-8'
            }`}
          >
            <h3 className={`text-lg font-medium text-foreground mb-4 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-300 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              QUICK LINKS
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { label: "Home", to: "/" },
                { label: "Shop All", to: "/shopify-shop" },
                { label: "Relaxing Corner", to: "/relaxing-corner" },
                { label: "Favorites", to: "/favorites" }
              ].map((item, index) => (
                <li key={item.label} className={`transition-all duration-800 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-${400 + index * 150} ${
                  isFooterVisible ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-4'
                }`}>
                  <button
                    className="hover:text-foreground transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] hover:translate-x-1 hover:scale-[1.02] inline-block text-left"
                    onClick={() => navigate(item.to)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div 
            className={`transition-all duration-1200 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-300 ${
              isFooterVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-8'
            }`}
          >
            <h3 className={`text-lg font-medium text-foreground mb-4 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-400 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              SUPPORT
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { label: "Contact Us", to: "/contact" },
                { label: "Shipping + Delivery", to: "/shopify-shop" },
                { label: "Returns + Refund Policy", to: "/shopify-shop" },
                { label: "FAQs", to: "/shopify-shop" },
                { label: "Store Locations", to: "/contact#map-section" },
                { label: "Live Consultations", to: "/relaxing-corner" }
              ].map((item, index) => (
                <li key={item.label} className={`transition-all duration-800 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-${500 + index * 150} ${
                  isFooterVisible ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-4'
                }`}>
                  <button
                    className="hover:text-foreground transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] hover:translate-x-1 hover:scale-[1.02] inline-block text-left"
                    onClick={() => {
                      if (item.to.startsWith('/contact#')) {
                        // Navigate then scroll to map section
                        navigate('/contact');
                        setTimeout(() => {
                          const el = document.getElementById('map-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 50);
                        return;
                      }
                      navigate(item.to);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div 
            className={`transition-all duration-1200 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-400 ${
              isFooterVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-8'
            }`}
          >
            <h3 className={`text-lg font-medium text-foreground mb-4 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-500 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              COMPANY
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { label: "Our Story", to: "/about#our-story" },
                { label: "Blog", to: "/" },
                { label: "Certified Organic", to: "/about#certified-organic" },
                { label: "Sustainability", to: "/about" }
              ].map((item, index) => (
                <li key={item.label} className={`transition-all duration-800 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-${600 + index * 150} ${
                  isFooterVisible ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-4'
                }`}>
                  <button
                    className="hover:text-foreground transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] hover:translate-x-1 hover:scale-[1.02] inline-block text-left"
                    onClick={() => {
                      if (item.to.startsWith('/about#')) {
                        // Navigate then scroll to anchor
                        navigate('/about');
                        setTimeout(() => {
                          const anchor = item.to.split('#')[1];
                          const el = document.getElementById(anchor);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 50);
                        return;
                      }
                      if (item.to.startsWith('/contact#')) {
                        // Navigate then scroll to map section
                        navigate('/contact');
                        setTimeout(() => {
                          const el = document.getElementById('map-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 50);
                        return;
                      }
                      navigate(item.to);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div 
          className={`border-t border-border mt-12 pt-8 transition-all duration-1200 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-500 ${
            isFooterVisible 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-8'
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Certifications */}
            <div className={`flex items-center gap-4 mb-4 md:mb-0 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-600 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              <div className="text-xs text-muted-foreground transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-foreground hover:scale-105 hover:bg-primary/5 px-2 py-1 rounded">
                Certified Organic
              </div>
              <div className="text-xs text-muted-foreground transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-foreground hover:scale-105 hover:bg-primary/5 px-2 py-1 rounded">
                Climate Neutral Certified
              </div>
            </div>

            {/* Logo */}
            <div className={`mb-4 md:mb-0 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-700 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              <img src="/logo-dark.svg" alt="Aryk logo" className="h-12 w-auto mx-auto" />
            </div>

            {/* Social Icons */}
            <div className={`flex items-center gap-4 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-800 ${
              isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "Youtube" }
              ].map((social, index) => (
                <Button 
                  key={social.label}
                  variant="ghost" 
                  size="icon" 
                  className={`transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:text-primary hover:bg-primary/5 hover:shadow-md`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className={`flex flex-col md:flex-row justify-between items-center mt-8 pt-4 border-t border-border transition-all duration-1000 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] delay-900 ${
            isFooterVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
          }`}>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 md:mb-0">
              <span className="transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-foreground hover:scale-105 hover:bg-primary/5 px-2 py-1 rounded">
                INDIA / ENGLISH
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <img src="/logo-dark.svg" alt="Aryk logo" className="h-5 w-auto" />
                © 2025
              </span>
              {[
                "Privacy Policy",
                "Terms of Service", 
                "Accessibility"
              ].map((item, index) => (
                <a 
                  key={item}
                  href="#" 
                  className="hover:text-foreground transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] hover:translate-x-1 hover:scale-[1.02] inline-block"
                >
                  {item}
                </a>
              ))}
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:text-primary hover:bg-primary/5 hover:shadow-md"
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