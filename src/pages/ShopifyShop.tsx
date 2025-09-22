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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const ShopifyShop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  // Global cart context
  const { 
    cartItems: globalCartItems, 
    isCartOpen, 
    setIsCartOpen, 
    getCartCount 
  } = useCart();

  // Shopify hooks
  const { products, loading, error, pageInfo, refetch } = useShopifyProducts(50);
  const { 
    cart, 
    addToCart, 
    updateCartItem, 
    removeFromCart, 
    getCartItemCount, 
    getCartTotal 
  } = useShopifyCart();

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('aryk_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Get unique categories from products (normalize to avoid empty values)
  const categories = useMemo(() => {
    const cats = products
      .map(p => (p.category || '').trim().toUpperCase() || 'UNCATEGORIZED')
      .filter(Boolean);
    return ["all", ...Array.from(new Set(cats))];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (product.category || '').toLowerCase().includes(searchQuery.toLowerCase());
      const normalizedCategory = (product.category || '').trim().toUpperCase() || 'UNCATEGORIZED';
      const matchesCategory = selectedCategory === "all" || normalizedCategory === selectedCategory;
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
  }, [products, searchQuery, selectedCategory, sortBy]);

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

      await addToCart(variantId, 1);
      toast({ title: "Added to cart", description: "Item has been added to your cart." });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({ title: "Error", description: "Failed to add to cart", variant: "destructive" });
    }
  };

  const handleUpdateCartQuantity = async (lineId: string, quantity: number) => {
    if (quantity === 0) {
      await removeFromCart(lineId);
      return;
    }
    
    await updateCartItem(lineId, quantity);
  };

  const handleRemoveFromCart = async (lineId: string) => {
    await removeFromCart(lineId);
  };

  const handleCheckout = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    try {
      if (cart?.id) {
        await ShopifyService.attachCustomerToCart(cart.id);
      }
    } catch (_) {}
    if (cart?.checkoutUrl) {
      window.open(cart.checkoutUrl, '_blank');
    } else {
      toast({ title: "Error", description: "No checkout URL available", variant: "destructive" });
    }
  };

  const handleToggleWishlist = (productId: number) => {
    // TODO: Implement wishlist functionality
    toast({
      title: "Wishlist",
      description: "Wishlist functionality coming soon!",
    });
  };

  // Convert Shopify cart to our cart format for CartSidebar
  const cartItems = useMemo(() => {
    if (!cart) return [];
    
    return cart.lines.edges.map(edge => ({
      id: edge.node.id,
      name: edge.node.merchandise.product.title,
      category: edge.node.merchandise.product.title, // Use title as category for now
      price: parseFloat(edge.node.merchandise.price.amount),
      image: edge.node.merchandise.product.images.edges[0]?.node.url || '/placeholder.svg',
      quantity: edge.node.quantity,
      lineId: edge.node.id
    }));
  }, [cart]);

  if (error) {
    return (
      <div className="bg-background">
        <Header
          onCartClick={() => setIsCartOpen(true)}
          onAuthClick={() => setIsAuthModalOpen(true)}
          cartCount={getCartCount()}
          variant="solid"
        />
        <div className="pt-28 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-serif font-light text-foreground mb-4">
              Unable to load products
            </h2>
            <p className="text-muted-foreground mb-6">
              {error}
            </p>
            <Button onClick={refetch} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        cartCount={getCartCount()}
        variant="solid"
      />
      
      <div className="pt-28 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-light text-foreground mb-6">
              Our Products
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated collection of organic beauty products
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-8">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
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

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading products...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
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
                        onAddToCart={handleAddToCart}
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
                        onAddToCart={handleAddToCart}
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
        onLogin={(userData) => {
          setUser(userData);
          setIsAuthModalOpen(false);
        }}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={globalCartItems}
        onUpdateQuantity={(id, quantity) => {
          // For now, just show a message that items need to be managed in Shopify
          toast({
            title: "Cart Management",
            description: "Please manage your cart items in the Shopify checkout.",
          });
        }}
        onRemoveItem={(id) => {
          // For now, just show a message that items need to be managed in Shopify
          toast({
            title: "Cart Management", 
            description: "Please manage your cart items in the Shopify checkout.",
          });
        }}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default ShopifyShop;
