import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart, showToast } = useStore();

  const handleAddAll = () => {
    wishlist.forEach((w) => {
      addToCart({ product: w.product, quantity: 1 });
    });
    showToast(`Added ${wishlist.length} items to cart!`, 'success');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-20 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white/30" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your Wishlist is Empty</h2>
            <p className="text-white/50 mb-8">Save your favorite products here for later.</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-amber-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-amber-300 transition-colors"
            >
              Explore Products
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
            <p className="text-white/50 mt-1">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddAll}
              className="hidden sm:flex items-center gap-2 bg-amber-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-300 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Add All to Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((w) => (
            <div key={w.product.id} className="relative group">
              <ProductCard product={w.product} />
              <button
                onClick={() => {
                  removeFromWishlist(w.product.id);
                  showToast('Removed from wishlist', 'info');
                }}
                className="absolute top-3 right-3 z-10 bg-black/80 text-red-400 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
