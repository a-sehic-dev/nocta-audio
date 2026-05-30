import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import Footer from '../components/Footer';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, addOrder } = useStore();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [isProcessing, setIsProcessing] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0 && step !== 'success') {
    navigate('/cart');
    return null;
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));

    const order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total,
      status: 'processing' as const,
      customer: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        zipCode: form.zipCode,
        country: form.country,
      },
      createdAt: new Date().toISOString(),
      paymentStatus: 'paid' as const,
    };

    addOrder(order);
    clearCart();
    setIsProcessing(false);
    setStep('success');
    window.scrollTo(0, 0);
  };

  // Success state
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-black pt-20 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h2>
            <p className="text-white/50 mb-2">Thank you for your purchase.</p>
            <p className="text-white/40 text-sm mb-8">
              A confirmation email has been sent to {form.email || 'your email'}.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
              <p className="text-white/60 text-sm mb-1">Order Total</p>
              <p className="text-amber-400 font-bold text-2xl">${total.toFixed(2)}</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-amber-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-amber-300 transition-colors"
            >
              Back to Home
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
        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className={`flex items-center gap-2 ${step === 'info' ? 'text-amber-400' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 'info' ? 'bg-amber-400 text-black' : 'bg-white/10 text-white/40'}`}>
              1
            </div>
            <span className="text-sm font-medium hidden sm:inline">Information</span>
          </div>
          <div className="w-12 h-px bg-white/10" />
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-amber-400' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 'payment' ? 'bg-amber-400 text-black' : 'bg-white/10 text-white/40'}`}>
              2
            </div>
            <span className="text-sm font-medium hidden sm:inline">Payment</span>
          </div>
        </div>

        <button
          onClick={() => (step === 'payment' ? setStep('info') : navigate('/cart'))}
          className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {step === 'payment' ? 'Back to Information' : 'Back to Cart'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2">
            {step === 'info' ? (
              <form onSubmit={handleSubmitInfo} className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">First Name *</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleInput}
                      required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Last Name *</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleInput}
                      required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="Doe"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleInput}
                      required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Phone</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleInput}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-white/60 text-sm mb-2 block">Address *</label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleInput}
                      required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">City *</label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleInput}
                      required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="Los Angeles"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">ZIP Code *</label>
                    <input
                      name="zipCode"
                      value={form.zipCode}
                      onChange={handleInput}
                      required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="90210"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-white/60 text-sm mb-2 block">Country *</label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleInput}
                      required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="HR">Croatia</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 bg-amber-400 text-black py-4 rounded-full font-semibold hover:bg-amber-300 transition-all hover:scale-[1.01]"
                >
                  Continue to Payment
                </button>
              </form>
            ) : (
              <form onSubmit={handlePayment} className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  Payment Details
                </h2>
                <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4 mb-6">
                  <p className="text-amber-400 text-sm font-medium mb-1">Test Mode</p>
                  <p className="text-white/50 text-xs">Use any card number (e.g., 4242 4242 4242 4242) to simulate payment.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Card Number *</label>
                    <input
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleInput}
                      required
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Cardholder Name *</label>
                    <input
                      name="cardName"
                      value={form.cardName}
                      onChange={handleInput}
                      required
                      placeholder="John Doe"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Expiry Date *</label>
                      <input
                        name="expiry"
                        value={form.expiry}
                        onChange={handleInput}
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-2 block">CVV *</label>
                      <input
                        name="cvv"
                        value={form.cvv}
                        onChange={handleInput}
                        required
                        placeholder="123"
                        maxLength={4}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-6 bg-amber-400 text-black py-4 rounded-full font-semibold hover:bg-amber-300 transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ${total.toFixed(2)}
                      <CreditCard className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-semibold mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-14 h-14 bg-neutral-900 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{item.product.name}</p>
                      <p className="text-white/40 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-amber-400 text-sm font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-white/60 text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60 text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-amber-400 font-bold text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-white/30 text-xs">
                  <Shield className="w-3 h-3" />
                  Secure SSL encryption
                </div>
                <div className="flex items-center gap-2 text-white/30 text-xs">
                  <Truck className="w-3 h-3" />
                  Free returns within 30 days
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

