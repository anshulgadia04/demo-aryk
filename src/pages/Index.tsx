import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import TestimonialSection from "@/components/TestimonialSection";
import YouTubeCarousel from "@/components/YouTubeCarousel";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import CartSidebar from "@/components/CartSidebar";
import ScrollToTop from "@/components/ScrollToTop";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { ShopifyService } from "@/lib/shopifyService";
import { markCheckoutInitiated, CART_STORAGE_KEY } from "@/lib/checkoutUtils";

interface User {
  id: number;
  email: string;
  name: string;
}

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const { 
    cartItems,
    isCartOpen, 
    setIsCartOpen,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getCartCount
  } = useCart();

  // Get the raw Shopify cart from localStorage for checkout
  const getCart = () => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (err) {
        return null;
      }
    }
    return null;
  };

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('aryk_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleCheckout = async () => {
    const cart = getCart();
    // Allow guest checkout to work across browsers (localStorage won't sync across browsers)
    const checkoutUrl = cart?.checkoutUrl;
    if (!checkoutUrl) {
      toast({ title: "Error", description: "No checkout URL available", variant: "destructive" });
      return;
    }
    // Best-effort: attach customer in background if logged in on server
    if (cart?.id) {
      // Fire-and-forget to avoid popup blockers; do not await before navigation
      ShopifyService.attachCustomerToCart(cart.id).catch(() => {});
    }
    
    // Mark that checkout was initiated
    markCheckoutInitiated();
    
    // Add return URL parameter
    const returnUrl = encodeURIComponent(window.location.origin);
    const finalCheckoutUrl = checkoutUrl.includes('?') 
      ? `${checkoutUrl}&return_to=${returnUrl}`
      : `${checkoutUrl}?return_to=${returnUrl}`;
    
    // Same-tab redirect avoids popup blockers in some browsers
    window.location.href = finalCheckoutUrl;
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('aryk_user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  // Wishlist
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('aryk_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('aryk_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleAddToCart = async (product: any) => {
    try {
      // Prefer first available-for-sale variant, then any
      let variantId = product.variants?.find((v: any) => v.availableForSale)?.id || product.variants?.[0]?.id;

      // Fallback: fetch full product from Shopify to get variant ID
      if (!variantId && product.handle) {
        try {
          const full = await ShopifyService.getProduct(product.handle);
          // Try to get first available variant from raw response
          const edges = full?.variants?.edges || [];
          const availableEdge = edges.find((e: any) => e?.node?.availableForSale);
          variantId = availableEdge?.node?.id || edges[0]?.node?.id;
        } catch (e) {
          // ignore, will show error below
        }
      }

      if (!variantId) {
        toast({
          title: "Error",
          description: "Product variant not available",
          variant: "destructive",
        });
        return;
      }

      // Pass the product with variant ID to CartContext's addToCart
      await addToCart({
        id: variantId,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image || '/placeholder.svg',
      }, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({ title: "Error", description: "Failed to add to cart", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        cartCount={getCartCount()}
        variant="transparent"
      />
      
      <main>
        <HeroSection />
        <ProductGrid onAddToCart={handleAddToCart} />
        <YouTubeCarousel
          videoIds={[
            " ",
            "",
            "",
            "",
            ""
          ]} 
          
          title="Our YouTube Channel"
          subtitle="Scroll to explore our latest videos"
        />
        <TestimonialSection />
      </main>
      
      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <ScrollToTop />
    </div>
  );
};

export default Index;




