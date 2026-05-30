import { useState } from 'react';
import { Star, CheckCircle, Send } from 'lucide-react';
import { useStore } from '../store/useStore';

interface Props {
  productId: string;
}

export default function ReviewsSection({ productId }: Props) {
  const { addReview, getProductReviews, showToast } = useStore();
  const productReviews = getProductReviews(productId);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author: '', rating: 5, text: '' });

  const avgRating = productReviews.length
    ? productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((s) => ({
    stars: s,
    count: productReviews.filter((r) => r.rating === s).length,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author.trim() || !form.text.trim()) return;
    addReview({
      id: `r${Date.now()}`,
      productId,
      author: form.author,
      rating: form.rating,
      text: form.text,
      verified: false,
      date: new Date().toISOString().split('T')[0],
    });
    setForm({ author: '', rating: 5, text: '' });
    setShowForm(false);
    showToast('Review submitted!', 'success');
  };

  return (
    <div className="mt-16 border-t border-white/10 pt-12">
      <h2 className="text-2xl font-bold text-white mb-8">Customer Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-white mb-2">{avgRating.toFixed(1)}</div>
              <div className="flex justify-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(avgRating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
                ))}
              </div>
              <p className="text-white/50 text-sm">{productReviews.length} reviews</p>
            </div>
            <div className="space-y-2">
              {ratingCounts.map((rc) => (
                <div key={rc.stars} className="flex items-center gap-2">
                  <span className="text-white/60 text-xs w-3">{rc.stars}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${productReviews.length ? (rc.count / productReviews.length) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-white/40 text-xs w-6 text-right">{rc.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/60">{productReviews.length} review{productReviews.length !== 1 ? 's' : ''}</p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-amber-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-300 transition-colors"
            >
              Write a Review
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-semibold mb-4">Write Your Review</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  value={form.author}
                  onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                  placeholder="Your name"
                  required
                  className="bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                />
                <select
                  value={form.rating}
                  onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                  className="bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                >
                  {[5, 4, 3, 2, 1].map((s) => (
                    <option key={s} value={s}>{s} stars</option>
                  ))}
                </select>
              </div>
              <textarea
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                placeholder="Share your experience..."
                rows={4}
                required
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400 resize-none mb-4"
              />
              <div className="flex gap-3">
                <button type="submit" className="bg-amber-400 text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-amber-300 transition-colors flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Review
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="text-white/50 hover:text-white text-sm px-4">
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {productReviews.map((review) => (
              <div key={review.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-400/20 rounded-full flex items-center justify-center">
                      <span className="text-amber-400 font-bold text-sm">{review.author[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{review.author}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-green-400 text-xs">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-white/40 text-xs">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
