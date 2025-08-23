import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X, Heart, Home, Info, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onCartClick: () => void;
  onAuthClick: () => void;
  cartCount: number;
  variant?: "transparent" | "solid";
}

const Header = ({ onCartClick, onAuthClick, cartCount, variant = "transparent" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <header className={`${variant === 'transparent' ? 'absolute bg-transparent' : 'sticky top-0 bg-background/90 supports-[backdrop-filter]:bg-background/70 border-b border-border backdrop-blur'} left-0 right-0 z-50`}>
        <div className="container mx-auto px-4 relative">
          <div className={`flex items-center justify-between h-16 md:h-20 ${variant === 'transparent' ? 'text-white' : 'text-foreground'}`}>
            {/* Left: burger always visible + desktop links */}
            <div className="flex items-center gap-4 md:gap-6">
              <Button
                variant="ghost"
                size="icon"
                className={`${variant === 'transparent' ? 'text-white hover:text-white/90' : 'text-foreground hover:text-foreground/90'} hover:!bg-transparent`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              <nav className="hidden md:flex items-center gap-6 uppercase tracking-wide text-sm">
                <Button
                  variant="ghost"
                  className={`relative ${variant === 'transparent' ? 'text-white hover:text-white/90' : 'text-foreground hover:text-foreground/90'} hover:!bg-transparent after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 ${variant === 'transparent' ? 'after:bg-white' : 'after:bg-foreground'} after:transition-transform after:duration-300 hover:after:scale-x-100`}
                  onClick={() => navigate("/shop")}
                >
                  SHOP
                </Button>
                <Button
                  variant="ghost"
                  className={`relative ${variant === 'transparent' ? 'text-white hover:text-white/90' : 'text-foreground hover:text-foreground/90'} hover:!bg-transparent after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 ${variant === 'transparent' ? 'after:bg-white' : 'after:bg-foreground'} after:transition-transform after:duration-300 hover:after:scale-x-100`}
                  onClick={() => navigate("/relaxing-corner")}
                >
                  RELAXING CORNER
                </Button>
              </nav>
            </div>

            {/* Centered logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Button
                variant="ghost"
                className={`p-0 h-auto text-3xl md:text-4xl font-serif font-light tracking-wide ${variant === 'transparent' ? 'text-white hover:text-white/90' : 'text-foreground hover:text-foreground/90'} hover:!bg-transparent select-none cursor-pointer transition-colors duration-200`}
                onClick={() => navigate("/")}
              >
                ARYK
              </Button>
            </div>

            {/* Right: search underline + icons */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="hidden md:block w-72 lg:w-96">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="SEARCH"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`bg-transparent border-0 border-b ${variant === 'transparent' ? 'border-white/70 text-white placeholder:text-white/70' : 'border-foreground/70 text-foreground placeholder:text-muted-foreground'} rounded-none pr-10 focus-visible:ring-0 focus-visible:ring-offset-0`}
                  />
                  <Search className={`absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 ${variant === 'transparent' ? 'text-white/70' : 'text-muted-foreground'}`} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onAuthClick}
                  className={`${variant === 'transparent' ? 'text-white hover:text-white/90' : 'text-foreground hover:text-foreground/90'} hover:!bg-transparent`}
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${variant === 'transparent' ? 'text-white hover:text-white/90' : 'text-foreground hover:text-foreground/90'} hover:!bg-transparent`}
                  onClick={() => navigate('/favorites')}
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCartClick}
                  className={`relative ${variant === 'transparent' ? 'text-white hover:text-white/90' : 'text-foreground hover:text-foreground/90'} hover:!bg-transparent`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className={`absolute -top-1 -right-1 ${variant === 'transparent' ? 'bg-white text-black' : 'bg-foreground text-background'} text-xs rounded-full h-5 w-5 flex items-center justify-center`}>
                      {cartCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className={`md:hidden border-t ${variant === 'transparent' ? 'border-white/20 text-white' : 'border-border text-foreground'}`}>
              <nav className="py-4 space-y-2">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${variant === 'transparent' ? 'text-white hover:text-white/90' : 'text-foreground hover:text-foreground/90'} hover:!bg-transparent relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 ${variant === 'transparent' ? 'after:bg-white' : 'after:bg-foreground'} after:transition-transform after:duration-300 hover:after:scale-x-100`}
                  onClick={() => { navigate("/shop"); setIsMenuOpen(false); }}
                >
                  SHOP
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${variant === 'transparent' ? 'text-white hover:text-white/90' : 'text-foreground hover:text-foreground/90'} hover:!bg-transparent relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 ${variant === 'transparent' ? 'after:bg-white' : 'after:bg-foreground'} after:transition-transform after:duration-300 hover:after:scale-x-100`}
                  onClick={() => { navigate("/relaxing-corner"); setIsMenuOpen(false); }}
                >
                  RELAXING CORNER
                </Button>
                <div className="pt-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="SEARCH"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`bg-transparent border-0 border-b ${variant === 'transparent' ? 'border-white/70 text-white placeholder:text-white/70' : 'border-foreground/70 text-foreground placeholder:text-muted-foreground'} rounded-none pr-10 focus-visible:ring-0 focus-visible:ring-offset-0`}
                    />
                    <Search className={`absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 ${variant === 'transparent' ? 'text-white/70' : 'text-muted-foreground'}`} />
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Animated Sidebar Menu */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Sidebar */}
        <div className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-serif font-light text-foreground">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
              className="hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="p-6">
            <nav className="space-y-4">
              {/* About */}
              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-sm font-medium uppercase tracking-wide hover:!bg-transparent relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100"
                onClick={() => { navigate("/about"); setIsMenuOpen(false); }}
              >
                ABOUT US
              </Button>

              {/* Contact */}
              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-sm font-medium uppercase tracking-wide hover:!bg-transparent relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100"
                onClick={() => { navigate("/contact"); setIsMenuOpen(false); }}
              >
                CONTACT US
              </Button>
            </nav>

            {/* Divider */}
            <div className="my-8 border-t border-gray-200" />

            {/* Additional Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Quick Links</h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm font-medium uppercase tracking-wide hover:!bg-transparent relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100"
                  onClick={() => { navigate("/shop"); setIsMenuOpen(false); }}
                >
                  SHOP ALL PRODUCTS
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm font-medium uppercase tracking-wide hover:!bg-transparent relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100"
                  onClick={() => { navigate("/relaxing-corner"); setIsMenuOpen(false); }}
                >
                  RELAXING CORNER
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm font-medium uppercase tracking-wide hover:!bg-transparent relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100"
                  onClick={() => { navigate("/favorites"); setIsMenuOpen(false); }}
                >
                  MY FAVORITES
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-2">ARYK Organics</p>
                <p className="text-xs text-gray-400">Natural Beauty, Naturally You</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;