import { useState } from 'react';
import { Calendar, Clock, User, ChevronLeft } from 'lucide-react';
import { blogPosts } from '../data/blog';
import Footer from '../components/Footer';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const post = blogPosts.find((p) => p.id === selectedPost);

  const categories = ['All', ...new Set(blogPosts.map((p) => p.category))];
  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  if (post) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Blog
          </button>

          <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">{post.category}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 text-white/50 text-sm mb-8">
            <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime} read</span>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden mb-8 bg-neutral-900">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-invert max-w-none">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-white/70 leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <p className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-2">NOCTA Journal</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">The Audio Blog</h1>
          <p className="text-white/50 max-w-2xl mx-auto">Insights, guides, and stories from the world of premium audio.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat ? 'bg-amber-400 text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post.id)}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all cursor-pointer hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">{post.category}</span>
                <h3 className="text-white font-semibold text-lg mt-2 mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-white/50 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-white/40 text-xs">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
