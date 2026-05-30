import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { products } from '../data/products';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'headphones', name: 'Headphones', count: products.filter((p) => p.category === 'headphones').length },
    { id: 'speakers', name: 'Speakers', count: products.filter((p) => p.category === 'speakers').length },
    { id: 'earbuds', name: 'Earbuds', count: products.filter((p) => p.category === 'earbuds').length },
  ];

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return result;
  }, [activeCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Shop</h1>
          <p className="text-white/50">{filtered.length} products available</p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.name}
                <span className="ml-1 opacity-60">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white/5 text-white/60 px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 text-white/60 px-4 py-2 rounded-full text-sm border border-white/10 focus:outline-none focus:border-amber-400"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name</option>
            </select>
            <div className="hidden sm:flex bg-white/5 rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-amber-400 text-black' : 'text-white/40'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-colors ${viewMode === 'list' ? 'bg-amber-400 text-black' : 'text-white/40'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Price Filter */}
        {showFilters && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <label className="text-white/60 text-sm mb-2 block">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={1000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="flex-1 accent-amber-400"
              />
              <button
                onClick={() => setPriceRange([0, 1000])}
                className="text-amber-400 text-sm hover:underline"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Products */}
        {filtered.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-white/40 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => { setActiveCategory('all'); setPriceRange([0, 1000]); }}
              className="mt-4 text-amber-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
