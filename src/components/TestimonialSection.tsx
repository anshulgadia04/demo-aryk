import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import imgAshwagandha from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.55_f82027bb.jpg";
import imgVitaminC from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.52_9cb19fa4.jpg";
import imgTurmeric from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.53_9ec97964.jpg";

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Left side - Product image */}
          <div className="hidden lg:block w-1/3">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={testimonials[currentSlide].image}
                alt={testimonials[currentSlide].product}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right side - Testimonial */}
          <div className="lg:w-2/3 lg:pl-16">
            <div className="text-center lg:text-left">
              <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">
                WHAT OUR FANS SAY
              </p>
              
              <blockquote className="text-2xl lg:text-3xl font-serif text-foreground mb-8 leading-relaxed">
                "{testimonials[currentSlide].text}"
              </blockquote>
              
              <div className="mb-8">
                <p className="text-foreground font-medium mb-2">
                  - {testimonials[currentSlide].author}
                </p>
                <Button variant="link" className="text-primary p-0 h-auto font-normal underline">
                  SHOP {testimonials[currentSlide].product}
                </Button>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(testimonials[currentSlide].rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({testimonials[currentSlide].reviewCount})</span>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevSlide}
                  className="rounded-full border border-border"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {/* Slide indicators */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
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
                  className="rounded-full border border-border"
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