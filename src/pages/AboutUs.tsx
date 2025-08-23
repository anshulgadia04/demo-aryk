import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Leaf, Heart, Users, Target, Shield, Star, Globe, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Header
        onCartClick={() => {}}
        onAuthClick={() => {}}
        cartCount={0}
        variant="transparent"
      />
      
      <div className="min-h-screen bg-background pt-0">
        {/* Hero Section - EXACT KORA STYLE with Video Background */}
        <div className="relative h-screen overflow-hidden">
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
              <h1 className="text-7xl font-serif font-light text-white mb-12 leading-none">
                YOUR BEST SKIN.<br />
                ORGANICALLY.
              </h1>
              <p className="text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light">
                We believe everything we use can be powerful, gentle, and effective without compromising your health or our planet. 
                Our formulas harness the best of nature to nourish, replenish, and detoxify your skin for a healthier glow you can see 
                using the highest quality certified organic ingredients you can trust.
              </p>
            </div>
          </div>
        </div>

        {/* Three Pillars Section - EXACT KORA LAYOUT with Images */}
        <div className="py-24 relative overflow-hidden">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
              {/* Highly Effective */}
              <div className="text-center">
                <div className="mb-8">
                  <img 
                    src="/effective.png" 
                    alt="Highly Effective Products"
                    className="w-full h-64 object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-3xl font-serif font-light text-foreground mb-6">
                  Highly Effective
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our results are clear, compelling, and proven.<br />
                  We combine the highest quality plant-powered<br />
                  ingredients with the latest technologies, delivering<br />
                  results that are visible immediately and continuously.
                </p>
              </div>

              {/* Certified Organic */}
              <div className="text-center">
                <div className="mb-8">
                  <img 
                    src="/organic.png" 
                    alt="Certified Organic Ingredients"
                    className="w-full h-64 object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-3xl font-serif font-light text-foreground mb-6">
                  Certified Organic
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our products are formulated with certified organic ingredients that contain up to 60% more antioxidants. Our sustainable harvesting practices result in<br />
                  less waste and no harmful ingredients.<br />
                  We are good for you and our planet, too.
                </p>
              </div>

              {/* Always Uplifting */}
              <div className="text-center">
                <div className="mb-8">
                  <img 
                    src="/uplifting.png" 
                    alt="Always Uplifting Experience"
                    className="w-full h-64 object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-3xl font-serif font-light text-foreground mb-6">
                  Always Uplifting
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
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

        {/* Certifications Badge Row - EXACT KORA STYLE */}
        <div className="py-12 bg-white border-y border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-12">
              <Badge variant="outline" className="text-base px-6 py-3 border-gray-300 text-gray-700 bg-white">
                Climate Neutral
              </Badge>
              <Badge variant="outline" className="text-base px-6 py-3 border-gray-300 text-gray-700 bg-white">
                Certified Organic
              </Badge>
              <Badge variant="outline" className="text-base px-6 py-3 border-gray-300 text-gray-700 bg-white">
                Cruelty Free
              </Badge>
            </div>
          </div>
        </div>

        {/* Founder's Story Section - EXACT KORA LAYOUT */}
        <div className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl font-serif font-light text-foreground text-center mb-20">
                Founder's Story
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                <div className="space-y-8">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    When I was 16, my mother was diagnosed with cancer, and I started to take a closer look at what I was putting in and on my body. 
                    This sparked my lifelong passion for organic ingredients and holistic health.
                  </p>
                  
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Over the years, I found there wasn't anyone creating certified organic and effective skincare and in 2009, 
                    I decided to make my own. After three years of partnering with some of the best chemists in the natural space, 
                    I launched a range of skincare that followed both the strictest global standards of safety and the highest levels 
                    of clinical performance for healthy, glowing skin.
                  </p>
                  
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Today, we're in 40 countries and growing—using sustainable organic harvesting practices that result in less waste 
                    for the planet, without toxins on your skin and up to 60% more antioxidants. I'm so proud of what we've created 
                    and for you to experience the power of organics.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gray-50 p-16 rounded-3xl">
                    <div className="w-40 h-40 bg-white rounded-full mx-auto mb-8 flex items-center justify-center shadow-sm">
                      <Users className="h-20 w-20 text-gray-600" />
                    </div>
                    <p className="text-lg text-muted-foreground mb-3">
                      signature
                    </p>
                    <h3 className="text-2xl font-serif font-light text-foreground mb-3">
                      MIRANDA KERR
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      Founder, CEO & Certified Health Coach
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - EXACT KORA STYLE */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-2 border-gray-300 hover:border-gray-400"
                onClick={() => navigate("/shop")}
              >
                Shop Refills
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-2 border-gray-300 hover:border-gray-400"
                onClick={() => navigate("/relaxing-corner")}
              >
                Good For The Planet
              </Button>
            </div>
          </div>
        </div>

        {/* Sustainability Section - EXACT KORA DESIGN */}
        <div className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-5xl mx-auto mb-20">
              <h2 className="text-5xl font-serif font-light text-foreground mb-8">
                Sustainability Is In Our Nature
              </h2>
              <p className="text-2xl text-muted-foreground font-light">
                Mindfully made, from our formulas to our packaging.
              </p>
              <Button 
                variant="outline" 
                className="mt-8 text-lg px-8 py-4 border-2 border-gray-300 hover:border-gray-400"
                onClick={() => navigate("/relaxing-corner")}
              >
                Learn More
              </Button>
            </div>

            {/* Certifications Grid - EXACT KORA LAYOUT */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
              {[
                { icon: Leaf, label: "Certified Organic" },
                { icon: Globe, label: "Climate Neutral Certified" },
                { icon: Heart, label: "Cruelty-Free" },
                { icon: Shield, label: "Sustainable Formulas" },
                { icon: Award, label: "Award Winning" },
                { icon: Star, label: "Powerful Results" }
              ].map((item, index) => (
                <div key={index} className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <item.icon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-base font-medium text-foreground">{item.label}</p>
                </div>
              ))}
            </div>
            
            {/* Additional repeated grid for mobile responsiveness */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto mt-8">
              {[
                { icon: Leaf, label: "Certified Organic" },
                { icon: Globe, label: "Climate Neutral Certified" },
                { icon: Heart, label: "Cruelty-Free" },
                { icon: Shield, label: "Sustainable Formulas" },
                { icon: Award, label: "Award Winning" },
                { icon: Star, label: "Powerful Results" }
              ].map((item, index) => (
                <div key={`repeat-${index}`} className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <item.icon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-base font-medium text-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA Section - EXACT KORA STYLE */}
        <div className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif font-light text-foreground mb-8">
              Experience the Power of Organics
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light">
              Join thousands of customers worldwide who have discovered the transformative power of natural, organic skincare.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gray-900 hover:bg-gray-800 text-white text-lg px-8 py-4"
                onClick={() => navigate("/shop")}
              >
                Shop Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-2 border-gray-300 hover:border-gray-400"
                onClick={() => navigate("/relaxing-corner")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AboutUs;
