import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function RecentlyViewed() {
  const navigate = useNavigate();
  const { recentlyViewed } = useStore();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Clock className="w-5 h-5 text-amber-400" />
          <h2 className="text-2xl font-bold text-white">Recently Viewed</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {recentlyViewed.map((product) => (
            <div
              key={product.id}
              onClick={() => { navigate(`/product/${product.id}`); window.scrollTo(0, 0); }}
              className="flex-shrink-0 w-48 bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-amber-400/30 transition-all cursor-pointer group"
            >
              <div className="aspect-square bg-neutral-900 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-3">
                <h3 className="text-white text-sm font-medium truncate group-hover:text-amber-400 transition-colors">{product.name}</h3>
                <p className="text-amber-400 text-sm font-bold">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
