import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../store/useStore';
import WishlistButton from './WishlistButton';
import QuickView from './QuickView';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useStore((s) => s.addToCart);
  const showToast = useStore((s) => s.showToast);
  const [quickView, setQuickView] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ product, quantity: 1 });
    showToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <>
      <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <Link to={`/product/${product.id}`} className="block relative aspect-square bg-neutral-900 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          {/* Hover actions */}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickView(true); }}
              className="bg-black/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-amber-400 hover:text-black transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-black/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-amber-400 hover:text-black transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
            <div onClick={(e) => e.stopPropagation()}>
              <WishlistButton product={product} size="sm" />
            </div>
          </div>
        </Link>

        {/* Info */}
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-amber-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-white/50 text-sm mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`}
              />
            ))}
            <span className="text-white/40 text-xs ml-1">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-amber-400 font-bold text-lg">${product.price.toFixed(2)}</span>
            {product.stock < 10 && product.stock > 0 && (
              <span className="text-red-400 text-xs">Only {product.stock} left</span>
            )}
          </div>
        </div>
      </div>

      <QuickView product={quickView ? product : null} onClose={() => setQuickView(false)} />
    </>
  );
}
