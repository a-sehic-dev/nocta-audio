import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Headphones, User, LogOut, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const cartCount = useStore((s) => s.getCartCount());
  const wishlistCount = useStore((s) => s.wishlist.length);
  const isAdmin = useStore((s) => s.isAdmin);
  const logout = useStore((s) => s.logout);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/blog', label: 'Blog' },
    { to: '/wishlist', label: 'Wishlist', badge: wishlistCount },
    { to: '/cart', label: 'Cart', badge: cartCount },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Headphones className="w-7 h-7 text-amber-400" />
            <span className="text-xl font-bold tracking-tight text-white">NOCTA</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium transition-colors ${
                  isActive(link.to) ? 'text-amber-400' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {link.badge ? (
                  <span className="absolute -top-2 -right-4 bg-amber-400 text-black text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {link.badge}
                  </span>
                ) : null}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className={`text-sm font-medium transition-colors ${isActive('/admin') ? 'text-amber-400' : 'text-white/70 hover:text-white'}`}>
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Wishlist icon (mobile) */}
            <Link to="/wishlist" className="md:hidden relative">
              <Heart className="w-5 h-5 text-white/80" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{wishlistCount}</span>
              )}
            </Link>
            {/* Cart icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-white/80 hover:text-white transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Admin */}
            <Link to="/admin" className="hidden md:block">
              <User className="w-5 h-5 text-white/80 hover:text-white transition-colors" />
            </Link>
            {isAdmin && (
              <button onClick={logout} className="hidden md:block text-white/70 hover:text-white">
                <LogOut className="w-4 h-4" />
              </button>
            )}
            {/* Mobile menu toggle */}
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between py-3 px-2 rounded-lg ${isActive(link.to) ? 'text-amber-400' : 'text-white/80'}`}
              >
                <span>{link.label}</span>
                {link.badge ? <span className="bg-amber-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">{link.badge}</span> : null}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="block text-amber-400 py-3 px-2">Dashboard</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
