import { useState, useMemo, useEffect } from "react";
import { products, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import CartSidebar from "@/components/CartSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
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

  // Get unique categories
  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return ["all", ...Array.from(new Set(cats))];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const addToCart = (product: Product) => {
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
    // TODO: Implement checkout logic
    toast({
      title: "Checkout",
      description: "Proceeding to checkout...",
    });
  };

  const handleToggleWishlist = (productId: number) => {
    // TODO: Implement wishlist functionality
    console.log("Toggled wishlist for product:", productId);
  };

  return (
    <>
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        cartCount={cartItems.length}
        variant="solid"
      />
      
      <div className="min-h-screen bg-background pt-0">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <h1 className="text-2xl md:text-4xl font-serif font-light text-foreground mb-1 md:mb-2">Shop</h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Discover our complete collection of natural skincare essentials, carefully crafted to nourish and enhance your natural beauty.
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex flex-col lg:flex-row gap-3 md:gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 md:h-11 text-sm md:text-base"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2 md:gap-3 items-center w-full md:w-auto">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-40 h-10 md:h-11 text-sm md:text-base">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-40 h-10 md:h-11 text-sm md:text-base">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || selectedCategory !== "all") && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {searchQuery && (
                  <Badge variant="secondary" className="gap-2">
                    Search: "{searchQuery}"
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 px-1 hover:bg-transparent"
                      onClick={() => setSearchQuery("")}
                    >
                      ×
                    </Button>
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="gap-2">
                    Category: {selectedCategory}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 px-1 hover:bg-transparent"
                      onClick={() => setSelectedCategory("all")}
                    >
                      ×
                    </Button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-6 md:py-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-muted-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="mb-4 md:mb-6">
                <p className="text-sm md:text-base text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="w-full">
                      <ProductCard
                        {...product}
                        onAddToCart={addToCart}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={false}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="w-full">
                      <ProductCard
                        {...product}
                        onAddToCart={addToCart}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <Footer />
      
      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(userData) => {
          setUser(userData);
          setIsAuthModalOpen(false);
          toast({
            title: "Welcome back!",
            description: "You have been successfully signed in.",
          });
        }}
      />
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </>
  );
};

export default Shop;
