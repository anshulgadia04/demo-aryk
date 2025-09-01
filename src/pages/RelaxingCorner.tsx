import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";
import CartSidebar from "@/components/CartSidebar";
import { useToast } from "@/hooks/use-toast";

type Bubble = {
  id: number;
  x: number;
  y: number;
  radius: number;
  speed: number;
  hue: number;
};

type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
};

type User = {
  id: number;
  email: string;
  name: string;
};

const RelaxingCorner = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const bubblesRef = useRef<Bubble[]>([]);
  const nextIdRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  const { toast } = useToast();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Video testimonials data (demo: repeat available videos)
  const videoTestimonials = [
    { id: 1, src: "/videos/hero.mp4", title: "Customer Testimonial #1" },
    { id: 2, src: "/videos/about-background.mp4", title: "Customer Testimonial #2" },
    { id: 3, src: "/videos/hero.mp4", title: "Customer Testimonial #3" },
    { id: 4, src: "/videos/about-background.mp4", title: "Customer Testimonial #4" },
    { id: 5, src: "/videos/hero.mp4", title: "Customer Testimonial #5" },
    { id: 6, src: "/videos/about-background.mp4", title: "Customer Testimonial #6" },
  ];

  type Review = {
    id: number;
    name: string;
    message: string;
    createdAt: string;
  };
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = () => {
      const radius = 16 + Math.random() * 20;
      bubblesRef.current.push({
        id: nextIdRef.current++,
        x: Math.random() * canvas.width,
        y: canvas.height + radius,
        radius,
        speed: 0.4 + Math.random() * 1.1,
        hue: 20 + Math.floor(Math.random() * 60),
      });
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (bubblesRef.current.length < 22 && Math.random() < 0.2) spawn();
      bubblesRef.current = bubblesRef.current
        .map((b) => ({ ...b, y: b.y - b.speed }))
        .filter((b) => b.y + b.radius > -8);

      for (const b of bubblesRef.current) {
        const g = ctx.createRadialGradient(
          b.x - b.radius * 0.35,
          b.y - b.radius * 0.35,
          1,
          b.x,
          b.y,
          b.radius
        );
        g.addColorStop(0, `hsla(${b.hue},80%,70%,0.9)`);
        g.addColorStop(1, `hsla(${b.hue},70%,50%,0.15)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Load cart and user
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

  // Persist cart
  useEffect(() => {
    localStorage.setItem('aryk_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Load saved thoughts/reviews
  useEffect(() => {
    const saved = localStorage.getItem("aryk_relax_reviews");
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch {
        // ignore corrupt storage
      }
    }
  }, []);

  // Persist thoughts/reviews
  useEffect(() => {
    localStorage.setItem("aryk_relax_reviews", JSON.stringify(reviews));
  }, [reviews]);

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let popped = false;
    bubblesRef.current = bubblesRef.current.filter((b) => {
      const hit = Math.hypot(b.x - x, b.y - y) <= b.radius;
      if (hit) popped = true;
      return !hit;
    });
    if (popped) setScore((s) => s + 1);
  };

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast({ title: 'Added to cart', description: `${product.name} has been added to your cart.` });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({ title: 'Removed from cart', description: 'Item has been removed from your cart.' });
  };

  const handleCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      setIsAuthModalOpen(true);
      toast({ title: 'Please sign in', description: 'You need to sign in to proceed with checkout.' });
      return;
    }
    toast({ title: 'Checkout successful!', description: 'Your order has been placed successfully.' });
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleLogin = (newUser: User) => setUser(newUser);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('aryk_user');
    toast({ title: 'Logged out', description: 'You have been logged out successfully.' });
  };

  const submitThought = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    const newReview: Review = {
      id: Date.now(),
      name: name.trim() || "Anonymous",
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [newReview, ...prev]);
    setMessage("");
  };

  return (
    <div className="bg-background">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        variant="solid"
      />
      <div className="pt-28 pb-16 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-3xl font-serif font-light text-foreground">Relaxing Corner</h2>
            <p className="text-muted-foreground">Pop gentle bubbles to unwind. Tap or click on rising bubbles.</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border" style={{ height: "60vh" }}>
            <canvas ref={canvasRef} onClick={onCanvasClick} className="w-full h-full cursor-pointer" />
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-sm">
              Score: {score}
            </div>
          </div>
        </div>
      </div>

      {/* Video Testimonials - Horizontal scroller */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h3 className="text-2xl font-serif font-light text-foreground">Video Testimonials</h3>
            <p className="text-muted-foreground">Swipe sideways to watch more videos.</p>
          </div>
          <div className="relative">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 [-ms-overflow-style:none] [scrollbar-width:none]">
              <style>{`.container ::-webkit-scrollbar{display:none}`}</style>
              {videoTestimonials.map((vid) => (
                <div key={vid.id} className="snap-start shrink-0 w-[280px] sm:w-[360px] md:w-[420px]">
                  <div className="rounded-xl overflow-hidden border border-border bg-card">
                    <div className="aspect-video bg-black">
                      <video
                        className="w-full h-full block"
                        src={vid.src}
                        controls
                        preload="metadata"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="text-sm text-muted-foreground">{vid.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Thoughts / Reviews */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h3 className="text-2xl font-serif font-light text-foreground">Share Your Thoughts</h3>
            <p className="text-muted-foreground">Leave a short note, review, or quote.</p>
          </div>

          <form onSubmit={submitThought} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="md:col-span-1"
            />
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your thought..."
              className="md:col-span-2 min-h-[96px]"
            />
            <div className="md:col-span-3 flex justify-end">
              <Button type="submit" className="bg-foreground text-background hover:bg-foreground/90">Share</Button>
            </div>
          </form>

          <div className="space-y-4">
            {reviews.length === 0 && (
              <div className="text-sm text-muted-foreground">No thoughts yet. Be the first to share!</div>
            )}
            {reviews.map((r) => (
              <div key={r.id} className="p-4 rounded-xl border border-border bg-card">
                <blockquote className="italic text-foreground">“{r.message}”</blockquote>
                <div className="mt-2 text-xs text-muted-foreground">— {r.name} · {new Date(r.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

export default RelaxingCorner;


