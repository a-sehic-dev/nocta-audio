import { useState } from 'react';
import { X, ShoppingCart, Star, ChevronRight } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../store/useStore';
import WishlistButton from './WishlistButton';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: Props) {
  const navigate = useNavigate();
  const { addToCart, showToast } = useStore();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart({ product, quantity });
    showToast(`${product.name} added to cart!`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-white font-semibold">Quick View</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <div className="aspect-square bg-black rounded-xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {product.badge && (
              <span className="inline-block self-start bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )}
            <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
                ))}
              </div>
              <span className="text-white/50 text-sm">({product.reviews})</span>
            </div>

            <p className="text-amber-400 font-bold text-2xl mb-4">${product.price.toFixed(2)}</p>
            <p className="text-white/60 text-sm mb-4 line-clamp-3">{product.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {product.features.slice(0, 4).map((f, i) => (
                <span key={i} className="bg-white/5 text-white/60 text-xs px-3 py-1 rounded-full">{f}</span>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-white/60 text-sm">Qty:</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full border border-white/20 text-white hover:border-amber-400 text-sm">-</button>
                <span className="text-white w-6 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full border border-white/20 text-white hover:border-amber-400 text-sm">+</button>
              </div>
            </div>

            <div className="flex gap-3 mt-auto">
              <button
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-400 text-black py-3 rounded-full font-semibold hover:bg-amber-300 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <WishlistButton product={product} />
              <button
                onClick={() => { onClose(); navigate(`/product/${product.id}`); }}
                className="px-4 py-3 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors flex items-center gap-1"
              >
                Full <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
