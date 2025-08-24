import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, Product } from "@/lib/products";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface ProductGridProps {
  onAddToCart: (product: any) => void;
}

const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('aryk_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  
  const { elementRef: sectionRef, isVisible: isSectionVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });

  useEffect(() => {
    localStorage.setItem('aryk_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: info panel */}
          <div 
            className={`md:col-span-4 transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-200 ${
              isSectionVisible 
                ? 'opacity-100 scale-100 translate-x-0' 
                : 'opacity-0 scale-95 -translate-x-8'
            }`}
          >
            <h2 className={`text-3xl font-serif font-light text-foreground mb-2 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-300 ${
              isSectionVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              Bestsellers
            </h2>
            <p className={`text-muted-foreground max-w-sm transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-400 ${
              isSectionVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}>
              Elevate your skincare ritual with our self-care essentials.
            </p>
          </div>

          {/* Right: horizontal scroller */}
          <div 
            className={`md:col-span-8 relative transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-400 ${
              isSectionVisible 
                ? 'opacity-100 scale-100 translate-x-0' 
                : 'opacity-0 scale-95 translate-x-8'
            }`}
          >
            <div
              ref={scrollerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {/* hide scrollbar for WebKit */}
              <style>{`.container ::-webkit-scrollbar{display:none}`}</style>
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className={`snap-start shrink-0 w-72 sm:w-80 md:w-96 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-${Math.min(index * 200 + 600, 1400)} ${
                    isSectionVisible 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 translate-y-8'
                  }`}
                >
                  <ProductCard
                    {...product}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                </div>
              ))}
            </div>

            {/* Scroll controls */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
              <Button
                aria-label="Previous"
                size="icon"
                variant="ghost"
                className="pointer-events-auto ml-2 rounded-full bg-white/60 hover:bg-white text-foreground border border-black/10 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:shadow-lg"
                onClick={() => scrollerRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                aria-label="Next"
                size="icon"
                variant="ghost"
                className="pointer-events-auto mr-2 rounded-full bg-white/60 hover:bg-white text-foreground border border-black/10 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:shadow-lg"
                onClick={() => scrollerRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;