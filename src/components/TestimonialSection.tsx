import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import imgAshwagandha from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.55_f82027bb.jpg";
import imgVitaminC from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.52_9cb19fa4.jpg";
import imgTurmeric from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.53_9ec97964.jpg";

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { elementRef: sectionRef, isVisible: isSectionVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });

  const testimonials = [
    {
      id: 1,
      text: "I am already obsessing over this mask. My fave mask I've ever used!",
      author: "Allyson D.",
      product: "TURMERIC BRIGHTENING & EXFOLIATING MASK",
      rating: 4.9,
      reviewCount: 2134,
      image: imgTurmeric
    },
    {
      id: 2,
      text: "This serum has transformed my skin completely. I can't imagine my routine without it!",
      author: "Sarah M.",
      product: "VITAMIN C BRIGHTENING SERUM",
      rating: 4.8,
      reviewCount: 789,
      image: imgVitaminC
    },
    {
      id: 3,
      text: "The most luxurious skincare experience. My skin feels so nourished and healthy.",
      author: "Emma K.",
      product: "ASHWAGANDHA BOUNCE MOISTURISER",
      rating: 4.8,
      reviewCount: 1367,
      image: imgAshwagandha
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-accent"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Left side - Product image */}
          <div 
            className={`hidden lg:block w-1/3 transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-200 ${
              isSectionVisible 
                ? 'opacity-100 scale-100 translate-x-0' 
                : 'opacity-0 scale-95 -translate-x-8'
            }`}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={testimonials[currentSlide].image}
                alt={testimonials[currentSlide].product}
                className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right side - Testimonial */}
          <div 
            className={`lg:w-2/3 lg:pl-16 transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-400 ${
              isSectionVisible 
                ? 'opacity-100 scale-100 translate-x-0' 
                : 'opacity-0 scale-95 translate-x-8'
            }`}
          >
            <div className="text-center lg:text-left">
              <p 
                className={`text-sm text-muted-foreground mb-4 uppercase tracking-wide transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-500 ${
                  isSectionVisible 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 translate-y-6'
                }`}
              >
                WHAT OUR FANS SAY
              </p>
              
              <blockquote 
                className={`text-2xl lg:text-3xl font-serif text-foreground mb-8 leading-relaxed transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-600 ${
                  isSectionVisible 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 translate-y-8'
                }`}
              >
                "{testimonials[currentSlide].text}"
              </blockquote>
              
              <div 
                className={`mb-8 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-700 ${
                  isSectionVisible 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 translate-y-8'
                }`}
              >
                <p className="text-foreground font-medium mb-2">
                  - {testimonials[currentSlide].author}
                </p>
                <Button variant="link" className="text-primary p-0 h-auto font-normal underline transition-colors duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-primary/80">
                  SHOP {testimonials[currentSlide].product}
                </Button>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 ${
                          i < Math.floor(testimonials[currentSlide].rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({testimonials[currentSlide].reviewCount})</span>
                </div>
              </div>

              {/* Navigation */}
              <div 
                className={`flex items-center justify-center lg:justify-start gap-4 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-800 ${
                  isSectionVisible 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 translate-y-8'
                }`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevSlide}
                  className="rounded-full border border-border transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:bg-accent/50 hover:shadow-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {/* Slide indicators */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-125 ${
                        index === currentSlide ? 'bg-primary' : 'bg-border'
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextSlide}
                  className="rounded-full border border-border transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:bg-accent/50 hover:shadow-md"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;