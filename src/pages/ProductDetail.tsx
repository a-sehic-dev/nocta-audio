import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Shield, RefreshCw, ChevronLeft, Plus, Minus } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import Footer from '../components/Footer';
import ReviewsSection from '../components/ReviewsSection';
import RecentlyViewed from '../components/RecentlyViewed';
import WishlistButton from '../components/WishlistButton';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [activeImage, setActiveImage] = useState(0);

  const { addToCart, addRecentlyViewed, showToast } = useStore();

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      window.scrollTo(0, 0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">Product not found</p>
          <button onClick={() => navigate('/shop')} className="text-amber-400 hover:underline">Back to Shop</button>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart({ product, quantity, color: selectedColor });
    showToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square bg-neutral-900 rounded-2xl overflow-hidden mb-4">
              <img src={product.images[activeImage] || product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${activeImage === i ? 'border-amber-400' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                {product.badge && (
                  <span className="inline-block bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {product.badge}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl font-bold text-white">{product.name}</h1>
              </div>
              <WishlistButton product={product} />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
                ))}
              </div>
              <span className="text-white/50 text-sm">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <p className="text-3xl font-bold text-amber-400 mb-2">${product.price.toFixed(2)}</p>
            {product.stock < 10 && product.stock > 0 && (
              <p className="text-red-400 text-sm mb-4">Only {product.stock} left in stock — order soon!</p>
            )}
            <p className="text-white/60 leading-relaxed mb-8">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-3 block">Color: <span className="text-white">{selectedColor}</span></label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full text-sm border transition-all ${selectedColor === color ? 'border-amber-400 text-amber-400 bg-amber-400/10' : 'border-white/20 text-white/60 hover:border-white/40'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-white/60 text-sm mb-3 block">Quantity</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-amber-400 hover:text-amber-400 transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="text-white font-semibold text-lg w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-amber-400 hover:text-amber-400 transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-10">
              <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 bg-amber-400 text-black py-4 rounded-full font-semibold hover:bg-amber-300 transition-all hover:scale-[1.02]">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4">
              {[{icon: Truck, label: 'Free Shipping'}, {icon: Shield, label: '2-Year Warranty'}, {icon: RefreshCw, label: '30-Day Returns'}].map((g) => (
                <div key={g.label} className="text-center p-4 bg-white/5 rounded-xl">
                  <g.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-white/60 text-xs">{g.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Features & Specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white/70 bg-white/5 rounded-xl px-4 py-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <ReviewsSection productId={product.id} />

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-12">
            <h2 className="text-2xl font-bold text-white mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <div key={p.id} onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0, 0); }} className="cursor-pointer group">
                  <div className="aspect-square bg-neutral-900 rounded-xl overflow-hidden mb-3">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors">{p.name}</h3>
                  <p className="text-amber-400 font-bold">${p.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <RecentlyViewed />
      <Footer />
    </div>
  );
}
