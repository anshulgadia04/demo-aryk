import { useRef, useState } from "react";
import img1 from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.55_f82027bb.jpg";
import img2 from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.54_8b831021.jpg";
import img3 from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.53_e5916e0a.jpg";
import img4 from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.53_9ec97964.jpg";
import img5 from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.53_21ccdee9.jpg";
import img6 from "../../aryk img/WhatsApp Image 2025-08-19 at 20.33.52_9cb19fa4.jpg";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badges?: string[];
}

interface ProductGridProps {
  onAddToCart: (product: any) => void;
}

const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: "Ashwagandha Bounce",
      category: "MOISTURISER",
      price: 2700,
      rating: 4.8,
      reviewCount: 1367,
      image: img1,
      badges: ["BESTSELLER", "IN A MINI"]
    },
    {
      id: 2,
      name: "Sandalnut Bloom",
      category: "MOISTURISER",
      price: 2700,
      rating: 4.6,
      reviewCount: 61,
      image: img2,
      badges: ["BESTSELLER"]
    },
    {
      id: 3,
      name: "Gotu Kola",
      category: "TONER SERUM",
      price: 2400,
      rating: 4.7,
      reviewCount: 892,
      image: img3,
      badges: ["BESTSELLER"]
    },
    {
      id: 4,
      name: "Turmeric Brightening",
      category: "FACE MASK",
      price: 1800,
      rating: 4.9,
      reviewCount: 2134,
      image: img4,
      badges: ["BESTSELLER"]
    },
    {
      id: 5,
      name: "Rose Quartz Glow",
      category: "FACE OIL",
      price: 3200,
      rating: 4.5,
      reviewCount: 456,
      image: img5
    },
    {
      id: 6,
      name: "Vitamin C Serum",
      category: "SERUM",
      price: 2900,
      rating: 4.8,
      reviewCount: 789,
      image: img6,
      badges: ["NEW"]
    }
  ];

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