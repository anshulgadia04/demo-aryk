import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import CartSidebar from "@/components/CartSidebar";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface User {
  id: number;
  email: string;
  name: string;
}

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Load cart and user from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('aryk_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    const savedUser = localStorage.getItem('aryk_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('aryk_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

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

    // Simulate checkout process
    toast({
      title: "Checkout successful!",
      description: "Your order has been placed successfully.",
    });
    
    setCartItems([]);
    setIsCartOpen(false);
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

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
    </div>
  );
};

export default Index;
