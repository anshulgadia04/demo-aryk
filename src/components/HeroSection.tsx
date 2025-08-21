import { Button } from "@/components/ui/button";

const HeroSection = () => {
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
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        {/* Breadcrumb */}
        <nav className="text-sm text-white/80 mb-8">
          <span className="hover:text-white cursor-pointer">HOME</span>
          <span className="mx-2">/</span>
          <span className="text-white">SKINCARE</span>
        </nav>

        {/* Main heading */}
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white leading-tight mb-6">
            Skincare
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-lg">
            Follow our three step skincare routine for naturally, healthy skin.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg"
          >
            DISCOVER PRODUCTS
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;