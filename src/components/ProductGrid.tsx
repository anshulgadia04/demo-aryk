import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, Product } from "@/lib/products";

interface ProductGridProps {
  onAddToCart: (product: any) => void;
}

const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('aryk_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const scrollerRef = useRef<HTMLDivElement | null>(null);

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
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: sticky info panel */}
          <div className="md:col-span-4 sticky top-4 self-start z-10">
            <h2 className="text-3xl font-serif font-light text-foreground mb-2">Bestsellers</h2>
            <p className="text-muted-foreground max-w-sm">
              Elevate your skincare ritual with our self-care essentials.
            </p>
          </div>

          {/* Right: horizontal scroller */}
          <div className="md:col-span-8 relative">
            <div
              ref={scrollerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {/* hide scrollbar for WebKit */}
              <style>{`.container ::-webkit-scrollbar{display:none}`}</style>
              {products.map((product) => (
                <div key={product.id} className="snap-start shrink-0 w-72 sm:w-80 md:w-96">
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
                className="pointer-events-auto ml-2 rounded-full bg-white/60 hover:bg-white text-foreground border border-black/10"
                onClick={() => scrollerRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                aria-label="Next"
                size="icon"
                variant="ghost"
                className="pointer-events-auto mr-2 rounded-full bg-white/60 hover:bg-white text-foreground border border-black/10"
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