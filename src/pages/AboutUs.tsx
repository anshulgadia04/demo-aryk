import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Leaf, Heart, Users, Target, Shield, Star, Globe, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const AboutUs = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    getCartCount 
  } = useCart();
  
  return (
    <>
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => {}}
        cartCount={getCartCount()}
        variant="transparent"
      />
      
      <div className="min-h-screen bg-background pt-0">
        {/* Hero Section - EXACT KORA STYLE with Video Background */}
        <div className="relative h-[70vh] md:h-screen overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/about-background.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center max-w-5xl mx-auto px-4">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light text-white mb-6 md:mb-12 leading-tight">
                YOUR BEST SKIN.<br />
                ORGANICALLY.
              </h1>
              <p className="text-base sm:text-lg md:text-2xl text-white/90 leading-relaxed max-w-3xl md:max-w-4xl mx-auto font-light px-2">
                We believe everything we use can be powerful, gentle, and effective without compromising your health or our planet. 
                Our formulas harness the best of nature to nourish, replenish, and detoxify your skin for a healthier glow you can see 
                using the highest quality certified organic ingredients you can trust.
              </p>
            </div>
          </div>
        </div>

        {/* Three Pillars Section - EXACT KORA LAYOUT with Images */}
        <div className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/aryk img/WhatsApp Image 2025-08-23 at 14.40.37.jpeg"
              alt="ARYK Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/80"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 max-w-7xl mx-auto">
              {/* Highly Effective */}
              <div className="text-center">
                <div className="mb-6 md:mb-8">
                  <img 
                    src="/effective.png" 
                    alt="Highly Effective Products"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover shadow-lg rounded-xl"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-4 md:mb-6">
                  Highly Effective
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Our results are clear, compelling, and proven.<br />
                  We combine the highest quality plant-powered<br />
                  ingredients with the latest technologies, delivering<br />
                  results that are visible immediately and continuously.
                </p>
              </div>

              {/* Certified Organic */}
              <div id="certified-organic" className="text-center">
                <div className="mb-6 md:mb-8">
                  <img 
                    src="/organic.png" 
                    alt="Certified Organic Ingredients"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover shadow-lg rounded-xl"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-4 md:mb-6">
                  Certified Organic
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Our products are formulated with certified organic ingredients that contain up to 60% more antioxidants. Our sustainable harvesting practices result in<br />
                  less waste and no harmful ingredients.<br />
                  We are good for you and our planet, too.
                </p>
              </div>

              {/* Always Uplifting */}
              <div className="text-center">
                <div className="mb-6 md:mb-8">
                  <img 
                    src="/uplifting.png" 
                    alt="Always Uplifting Experience"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover shadow-lg rounded-xl"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-4 md:mb-6">
                  Always Uplifting
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Our products are created to uplift and<br />
                  inspire through a combination of crystals,<br />
                  aromatherapy, and positive affirmations.<br />
                  We believe in a 360 approach to wellness<br />
                  for your mind, body, and skin.
                </p>
              </div>
            </div>
          </div>
        </div>



        {/* Founder's Story Section - EXACT KORA LAYOUT */}
        <div className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 id="our-story" className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-foreground text-center mb-10 md:mb-20">
                Founder's Story
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-start">
                <div className="space-y-8">
                  <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                    When I was 16, my mother was diagnosed with cancer, and I started to take a closer look at what I was putting in and on my body. 
                    This sparked my lifelong passion for organic ingredients and holistic health.
                  </p>
                  
                  <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                    Over the years, I found there wasn't anyone creating certified organic and effective skincare and in 2009, 
                    I decided to make my own. After three years of partnering with some of the best chemists in the natural space, 
                    I launched a range of skincare that followed both the strictest global standards of safety and the highest levels 
                    of clinical performance for healthy, glowing skin.
                  </p>
                  
                  <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                    Today, we're in 40 countries and growing—using sustainable organic harvesting practices that result in less waste 
                    for the planet, without toxins on your skin and up to 60% more antioxidants. I'm so proud of what we've created 
                    and for you to experience the power of organics.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gray-50 p-10 md:p-16 rounded-3xl">
                    <div className="w-28 h-28 md:w-40 md:h-40 bg-white rounded-full mx-auto mb-6 md:mb-8 flex items-center justify-center shadow-sm overflow-hidden">
                      <img 
                        src="/aryk img/1000_F_1334014397_GMDJFSX0q2UPKOxFVXUMigAjcwDCkRF6.jpg"
                        alt="saryu nayak - Founder"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                   
                    <h3 className="text-xl md:text-2xl font-serif font-light text-foreground mb-2 md:mb-3">
                      Saryu Nayak
                    </h3>
                    <p className="text-sm md:text-lg text-muted-foreground">
                      Founder, CEO & Certified Health Coach
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Section - EXACT KORA DESIGN with Background Image */}
        <div className="py-16 md:py-24 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/aryk img/WhatsApp Image 2025-08-23 at 14.40.37.jpeg"
              alt="Sustainability Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/80"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center max-w-5xl mx-auto mb-12 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-foreground mb-6 md:mb-8">
                Sustainability Is In Our Nature
              </h2>
              <p className="text-base md:text-2xl text-muted-foreground font-light">
                Mindfully made, from our formulas to our packaging.
              </p>
              {/* Learn More button removed as requested */}
            </div>

            {/* Certifications Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
              {[
                { icon: Leaf, label: "Certified Organic" },
                { icon: Globe, label: "Climate Neutral Certified" },
                { icon: Heart, label: "Cruelty-Free" },
                { icon: Shield, label: "Sustainable Formulas" },
                { icon: Award, label: "Award Winning" },
                { icon: Star, label: "Powerful Results" }
              ].map((item, index) => (
                <div key={index} className="text-center p-4 sm:p-6 md:p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <item.icon className="h-8 w-8 md:h-12 md:w-12 text-gray-600 mx-auto mb-2 md:mb-4" />
                  <p className="text-sm md:text-base font-medium text-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA Section - EXACT KORA STYLE */}
        <div className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-6 md:mb-8">
              Experience the Power of Organics
            </h2>
            <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto font-light px-2">
              Join thousands of customers worldwide who have discovered the transformative power of natural, organic skincare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gray-900 hover:bg-gray-800 text-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                onClick={() => navigate("/shop")}
              >
                Shop Now
              </Button>
              {/* Learn More button removed as requested */}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          // Check if user is signed in
          const savedUser = localStorage.getItem('aryk_user');
          if (!savedUser) {
            // Show auth modal or redirect to sign in
            window.location.href = '/shopify-shop';
            return;
          }
          // Redirect to Shopify shop for checkout
          window.location.href = '/shopify-shop';
        }}
      />
    </>
  );
};

export default AboutUs;
