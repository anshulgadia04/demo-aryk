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
import { useShopifyCart } from "@/hooks/useShopify";
import { ShopifyService } from "@/lib/shopifyService";
import { markCheckoutInitiated } from "@/lib/checkoutUtils";

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
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  // Shopify cart (single source of truth for checkout)
  const { 
    cart, 
    addToCart: addToShopifyCart, 
    updateCartItem, 
    removeFromCart: removeFromShopifyCart, 
    getCartItemCount 
  } = useShopifyCart();

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('aryk_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleCheckout = async () => {
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

  const cartCount = getCartItemCount();

  // Wishlist
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('aryk_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('aryk_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        cartCount={cartCount}
        variant="transparent"
      />
      
      <main>
        <HeroSection />
        <ProductGrid onAddToCart={async (product: any) => {
          try {
            let variantId = product.variants?.find((v: any) => v.availableForSale)?.id || product.variants?.[0]?.id;
            if (!variantId && product.handle) {
              try {
                const full = await ShopifyService.getProduct(product.handle);
                const edges = full?.variants?.edges || [];
                const availableEdge = edges.find((e: any) => e?.node?.availableForSale);
                variantId = availableEdge?.node?.id || edges[0]?.node?.id;
              } catch {}
            }
            if (!variantId) {
              toast({ title: "Error", description: "Product variant not available", variant: "destructive" });
              return;
            }
            await addToShopifyCart(variantId, 1);
            toast({ title: "Added to cart", description: "Item has been added to your cart." });
            setIsCartOpen(true);
          } catch (error) {
            console.error('Error adding to cart:', error);
            toast({ title: "Error", description: "Failed to add to cart", variant: "destructive" });
          }
        }} />
        <YouTubeCarousel
          videoIds={[
            "dQw4w9WgXcQ",
            "3JZ_D3ELwOQ",
            "oHg5SJYRHA0",
            "V-_O7nl0Ii0",
            "tVj0ZTS4WF4"
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
        items={(cart?.lines?.edges || []).map((edge: any) => ({
          id: edge.node.id,
          name: edge.node.merchandise.product.title,
          category: edge.node.merchandise.product.title,
          price: parseFloat(edge.node.merchandise.price.amount),
          image: edge.node.merchandise.product.images.edges[0]?.node.url || '/placeholder.svg',
          quantity: edge.node.quantity,
        }))}
        onUpdateQuantity={async (id, quantity) => {
          if (quantity <= 0) {
            await removeFromShopifyCart(String(id));
            return;
          }
          await updateCartItem(String(id), quantity);
        }}
        onRemoveItem={async (id) => {
          await removeFromShopifyCart(String(id));
        }}
        onCheckout={handleCheckout}
      />

      <ScrollToTop />
    </div>
  );
};

export default Index;
