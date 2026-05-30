import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !textRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 600);
      const translateY = scrollY * 0.4;
      textRef.current.style.opacity = String(opacity);
      textRef.current.style.transform = `translateY(${translateY}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black" />
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(251,191,36,0.15) 0%, transparent 50%)`
      }} />

      {/* Content */}
      <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <p className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase mb-6 animate-fade-in">
          Premium Audio Experience
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-6">
          <span className="block">Sound That</span>
          <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Moves You
          </span>
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Discover studio-quality headphones and speakers crafted for audiophiles who refuse to compromise.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-amber-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-amber-300 transition-all hover:scale-105"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/shop?category=headphones"
            className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all"
          >
            Headphones
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-12 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">50K+</div>
            <div className="text-white/50 text-sm mt-1">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">4.9</div>
            <div className="text-white/50 text-sm mt-1">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">24h</div>
            <div className="text-white/50 text-sm mt-1">Fast Shipping</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/40" />
      </div>
    </section>
  );
}
