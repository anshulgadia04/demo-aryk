import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const Favorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("aryk_wishlist");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => {}} onAuthClick={() => {}} cartCount={0} variant="solid" />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-serif font-light text-foreground mb-6">Your Favorites</h1>
        {favoriteProducts.length === 0 ? (
          <p className="text-muted-foreground">You haven't liked any products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProducts.map((p) => (
              <ProductCard
                key={p.id}
                {...p}
                onAddToCart={() => {}}
                onToggleWishlist={() => {}}
                isWishlisted={true}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;


