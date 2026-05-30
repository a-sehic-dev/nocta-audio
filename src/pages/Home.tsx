import { Link } from 'react-router-dom';
import { ArrowRight, Headphones, Speaker, Battery, Truck, Shield, RefreshCw, Clock, Star } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { blogPosts } from '../data/blog';

export default function Home() {
  const featured = products.filter(p => p.badge).slice(0, 4);
  const bestSellers = products.filter((p) => p.badge === 'Best Seller').slice(0, 2);
  const latestBlog = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-black">
      <Hero />

      {/* Featured Products */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-2">Featured</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Trending Now</h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors">View All <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <p className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-2 text-center">Browse</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Headphones', icon: Headphones, slug: 'headphones', count: 34 },
              { name: 'Earbuds', icon: Battery, slug: 'earbuds', count: 20 },
              { name: 'Speakers', icon: Speaker, slug: 'speakers', count: 30 },
              { name: 'Microphones', icon: Headphones, slug: 'microphones', count: 10 },
              { name: 'Accessories', icon: Battery, slug: 'accessories', count: 15 },
            ].map((cat) => (
              <Link key={cat.name} to={`/shop?category=${cat.slug}`} className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400/30 transition-all hover:-translate-y-1 text-center">
                <cat.icon className="w-10 h-10 text-amber-400 mb-3 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold">{cat.name}</h3>
                <p className="text-amber-400 text-sm">{cat.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-2 text-center">Top Rated</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bestSellers.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group flex flex-col sm:flex-row bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all">
                <div className="sm:w-48 aspect-square bg-neutral-900 flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">{product.badge}</span>
                  <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-amber-400 transition-colors">{product.name}</h3>
                  <p className="text-white/50 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />)}
                    <span className="text-white/40 text-xs ml-1">({product.reviews})</span>
                  </div>
                  <span className="text-amber-400 font-bold text-lg">${product.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <p className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-2 text-center">Why Us</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">The NOCTA Experience</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{icon: Truck, title: 'Free Shipping', desc: 'On all orders over $100'}, {icon: Shield, title: '2-Year Warranty', desc: 'Full coverage on all products'}, {icon: RefreshCw, title: 'Easy Returns', desc: '30-day money back guarantee'}, {icon: Battery, title: 'Long Battery', desc: 'Up to 40 hours playback'}].map((f) => (
              <div key={f.title} className="text-center">
                <div className="w-14 h-14 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-2">From the Journal</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Latest Articles</h2>
            </div>
            <Link to="/blog" className="hidden sm:flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors">All Articles <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestBlog.map((post) => (
              <Link key={post.id} to={`/blog`} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all hover:-translate-y-1">
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">{post.category}</span>
                  <h3 className="text-white font-semibold text-lg mt-2 mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">{post.title}</h3>
                  <div className="flex items-center gap-3 text-white/40 text-xs">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-2">Stay Updated</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Join the NOCTA Family</h2>
          <p className="text-white/50 mb-8">Subscribe for exclusive deals, new product launches, and audio tips.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400" />
            <button className="bg-amber-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-amber-300 transition-colors">Subscribe</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
