import { Heart } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../store/useStore';

interface Props {
  product: Product;
  size?: 'sm' | 'md';
}

export default function WishlistButton({ product, size = 'md' }: Props) {
  const { isInWishlist, addToWishlist, removeFromWishlist, showToast } = useStore();
  const inList = isInWishlist(product.id);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inList) {
      removeFromWishlist(product.id);
      showToast('Removed from wishlist', 'info');
    } else {
      addToWishlist(product);
      showToast('Added to wishlist!', 'success');
    }
  };

  const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <button
      onClick={toggle}
      className={`${sizeClasses} rounded-full border border-white/20 flex items-center justify-center transition-all ${
        inList
          ? 'bg-red-500/20 border-red-500/50 text-red-400'
          : 'text-white/40 hover:text-red-400 hover:border-red-400/30'
      }`}
    >
      <Heart className={`${iconSize} ${inList ? 'fill-red-400' : ''}`} />
    </button>
  );
}
