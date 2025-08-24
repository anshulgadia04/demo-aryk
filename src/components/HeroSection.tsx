import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const HeroSection = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Content */}
      <div 
        ref={elementRef}
        className={`relative z-10 container mx-auto px-4 h-full flex flex-col justify-center transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-8'
        }`}
      >
        {/* Breadcrumb */}
        <nav 
          className={`text-sm text-white/80 mb-8 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-200 ${
            isVisible 
              ? 'opacity-100 scale-100 translate-x-0' 
              : 'opacity-0 scale-95 -translate-x-6'
          }`}
        >
          <span className="hover:text-white cursor-pointer transition-colors duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">HOME</span>
          <span className="mx-2">/</span>
          <span className="text-white">SKINCARE</span>
        </nav>

        {/* Main heading */}
        <div className="max-w-2xl">
          <h1 
            className={`text-5xl md:text-7xl font-serif font-light text-white leading-tight mb-6 transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-400 ${
              isVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-12'
            }`}
          >
            Skincare
          </h1>
          <p 
            className={`text-lg text-white/90 mb-8 max-w-lg transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-600 ${
              isVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-8'
            }`}
          >
            Follow our three step skincare routine for naturally, healthy skin.
          </p>
          
          <Button 
            size="lg" 
            className={`bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-6 text-lg transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-800 hover:scale-[1.02] hover:shadow-lg ${
              isVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-8'
            }`}
          >
            DISCOVER PRODUCTS
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;