import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badges?: string[];
  onAddToCart: (product: any) => void;
  onToggleWishlist: (productId: number) => void;
  isWishlisted: boolean;
}

const ProductCard = ({
  id,
  name,
  category,
  price,
  originalPrice,
  rating,
  reviewCount,
  image,
  badges = [],
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}: ProductCardProps) => {
  const product = { id, name, category, price, image };

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full rounded-none">
      <div className="relative aspect-square overflow-hidden">
        {/* Product Image */}
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          loading="lazy"
          onError={(e) => {
            if ((e.currentTarget as HTMLImageElement).src.endsWith("placeholder.svg")) return;
            (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
          }}
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="bg-white/80 backdrop-blur text-foreground text-[10px] tracking-wide px-2 py-0.5 rounded uppercase border border-black/10"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Rating overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/80 backdrop-blur px-2 py-0.5 rounded-full border border-black/10">
          <span className="text-xs text-foreground">{rating.toFixed(1)}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">({reviewCount})</span>
        </div>

        {/* Wishlist heart overlay */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur hover:bg-white text-foreground shadow-sm"
          onClick={() => onToggleWishlist(id)}
          aria-label="Toggle wishlist"
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
        </Button>

        {/* Add to cart button - always visible like the reference */}
        <div className="absolute inset-x-3 bottom-3">
          <Button
            variant="outline"
            className="w-full rounded-full border border-black/20 bg-white/60 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md hover:bg-white/80 text-foreground transition-all duration-300 shadow-sm hover:shadow-md"
            onClick={() => onAddToCart(product)}
          >
            ADD TO CART
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <div className="mb-1">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground mb-2 uppercase">
          {category} • 2 SIZES
        </p>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">₹{price.toLocaleString()}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;