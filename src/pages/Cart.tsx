import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react';
import { useStore } from '../store/useStore';
import Footer from '../components/Footer';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useStore();

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-20 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-white/30" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
            <p className="text-white/50 mb-8">Looks like you haven&apos;t added anything yet.</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-amber-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-amber-300 transition-colors"
            >
              Start Shopping
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
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart ({getCartCount()})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-colors"
              >
                <div
                  className="w-24 h-24 bg-neutral-900 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`/product/${item.product.id}`)}
                >
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3
                        className="text-white font-semibold cursor-pointer hover:text-amber-400 transition-colors"
                        onClick={() => navigate(`/product/${item.product.id}`)}
                      >
                        {item.product.name}
                      </h3>
                      {item.color && <p className="text-white/40 text-sm">{item.color}</p>}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-white/30 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-amber-400 hover:text-amber-400 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-amber-400 hover:text-amber-400 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-amber-400 font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => navigate('/shop')}
              className="text-white/50 hover:text-amber-400 text-sm transition-colors flex items-center gap-1"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Continue Shopping
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-semibold text-lg mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping === 0 && (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Package className="w-4 h-4" />
                    You qualify for free shipping!
                  </div>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-amber-400 font-bold text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-amber-400 text-black py-4 rounded-full font-semibold hover:bg-amber-300 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-white/30 text-xs">
                  <Package className="w-3 h-3" />
                  Free shipping on orders over $100
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
