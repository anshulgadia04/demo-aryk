import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Leaf, Heart, Users, Target, Shield } from "lucide-react";

const AboutUs = () => {
  return (
    <>
      <Header
        onCartClick={() => {}}
        onAuthClick={() => {}}
        cartCount={0}
        variant="solid"
      />
      
      <div className="min-h-screen bg-background pt-0">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-b">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-serif font-light text-foreground mb-6">
                Our Story
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Born from a deep reverence for nature and a commitment to authentic wellness, 
                ARYK Organics represents the perfect harmony between ancient wisdom and modern science.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-light text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  To provide the purest, most effective natural skincare solutions that honor both 
                  your skin and the planet. We believe that true beauty comes from within and is 
                  nurtured by the earth's most precious gifts.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Every product we create is a testament to our commitment to sustainability, 
                  ethical sourcing, and the belief that nature provides everything we need for 
                  radiant, healthy skin.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-8 rounded-2xl">
                <div className="text-center">
                  <Leaf className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-light text-foreground mb-4">
                    Pure & Natural
                  </h3>
                  <p className="text-muted-foreground">
                    Certified organic ingredients sourced from sustainable farms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-light text-foreground text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl border">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-3">Authenticity</h3>
                <p className="text-muted-foreground">
                  We stay true to our roots, never compromising on quality or our commitment to natural ingredients.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl border">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-3">Transparency</h3>
                <p className="text-muted-foreground">
                  Every ingredient, every process, and every decision is made with complete transparency.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl border">
                <Leaf className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to protecting the environment and supporting sustainable farming practices.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl border">
                <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-3">Community</h3>
                <p className="text-muted-foreground">
                  Building a community of conscious consumers who value natural beauty and wellness.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl border">
                <Target className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  Combining traditional wisdom with modern science to create breakthrough formulations.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl border">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  Every product meets our rigorous standards for quality, efficacy, and safety.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-light text-foreground text-center mb-12">
              Our Journey
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-foreground mb-2">The Beginning</h3>
                    <p className="text-muted-foreground">
                      Founded in 2020, ARYK Organics started as a small family business with a big dream: 
                      to create skincare that truly works with nature, not against it.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-foreground mb-2">Research & Development</h3>
                    <p className="text-muted-foreground">
                      Years of research went into understanding traditional Ayurvedic practices and 
                      combining them with modern dermatological science.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-foreground mb-2">Growth & Impact</h3>
                    <p className="text-muted-foreground">
                      Today, we're proud to serve thousands of customers worldwide, helping them 
                      achieve healthy, radiant skin while protecting our planet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-light text-foreground text-center mb-12">
              Our Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white rounded-xl border">
                <Badge variant="secondary" className="text-lg px-4 py-2 mb-4">
                  Certified Organic
                </Badge>
                <p className="text-muted-foreground">
                  All our ingredients are certified organic by recognized international bodies.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl border">
                <Badge variant="secondary" className="text-lg px-4 py-2 mb-4">
                  Cruelty-Free
                </Badge>
                <p className="text-muted-foreground">
                  We never test on animals and are certified cruelty-free by PETA.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl border">
                <Badge variant="secondary" className="text-lg px-4 py-2 mb-4">
                  Eco-Friendly
                </Badge>
                <p className="text-muted-foreground">
                  Sustainable packaging and carbon-neutral shipping practices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-light mb-6">
              Join Our Journey
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Discover the power of nature and experience skincare that truly cares for you and the planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-green-600">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
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
