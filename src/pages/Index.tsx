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
import { useCart, CartItem } from "@/contexts/CartContext";

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

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('aryk_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      setIsAuthModalOpen(true);
      toast({
        title: "Please sign in",
        description: "You need to sign in to proceed with checkout.",
      });
      return;
    }

    // Redirect to Shopify shop for checkout
    window.location.href = '/shopify-shop';
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

  const cartCount = getCartCount();

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
        <ProductGrid onAddToCart={addToCart} />
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
