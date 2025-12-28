import { useState, useMemo, useEffect } from "react";
import { useShopifyProducts, useShopifyCart } from "@/hooks/useShopify";
import { ShopifyService } from "@/lib/shopifyService";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import CartSidebar from "@/components/CartSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Grid, List, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { markCheckoutInitiated } from "@/lib/checkoutUtils";

const ShopifyShop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  /** ✅ WISHLIST STATE */
  const [wishlist, setWishlist] = useState<(number | string)[]>(() => {
    const saved = localStorage.getItem("aryk_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const { isCartOpen, setIsCartOpen } = useCart();
  const { products, loading, error, refetch } = useShopifyProducts(50);
  const {
    cart,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartItemCount,
  } = useShopifyCart();

  useEffect(() => {
    const savedUser = localStorage.getItem("aryk_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  /** ✅ SYNC WISHLIST */
  useEffect(() => {
    const syncWishlist = () => {
      const saved = localStorage.getItem("aryk_wishlist");
      setWishlist(saved ? JSON.parse(saved) : []);
    };
    window.addEventListener("storage", syncWishlist);
    return () => window.removeEventListener("storage", syncWishlist);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["all"]);
    products.forEach((p) => {
      if (p.category) set.add(p.category.toUpperCase());
      p.tags?.forEach((t) => set.add(t.toUpperCase()));
    });
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const search = searchQuery.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(search) ||
        (p.category || "").toLowerCase().includes(search) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(search));

      const matchCategory =
        selectedCategory === "all" ||
        p.category?.toUpperCase() === selectedCategory ||
        p.tags?.some((t) => t.toUpperCase() === selectedCategory);

      return matchSearch && matchCategory;
    });

    filtered.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy]);

  /** ✅ WISHLIST TOGGLE */
  const handleToggleWishlist = (productId: number | string) => {
    let updated;

    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
      toast({ title: "Removed from Wishlist" });
    } else {
      updated = [...wishlist, productId];
      toast({ title: "Added to Wishlist" });
    }

    setWishlist(updated);
    localStorage.setItem("aryk_wishlist", JSON.stringify(updated));
  };

  const handleAddToCart = async (product: any) => {
    try {
      let variantId =
        product.variants?.find((v: any) => v.availableForSale)?.id ||
        product.variants?.[0]?.id;

      if (!variantId && product.handle) {
        const full = await ShopifyService.getProduct(product.handle);
        variantId =
          full?.variants?.edges?.[0]?.node?.id || null;
      }

      if (!variantId) {
        toast({ title: "Variant not available", variant: "destructive" });
        return;
      }

      await addToCart(variantId, 1);
      toast({ title: "Added to cart" });
    } catch {
      toast({ title: "Add to cart failed", variant: "destructive" });
    }
  };

  const handleCheckout = async () => {
    if (!cart?.checkoutUrl) return;
    markCheckoutInitiated();
    window.location.href = cart.checkoutUrl;
  };

  return (
    <div className="bg-background">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        cartCount={getCartItemCount()}
        variant="solid"
      />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={() =>
                  handleToggleWishlist(product.id)
                }
                isWishlisted={wishlist.includes(product.id)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(u) => setUser(u)}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default ShopifyShop;
