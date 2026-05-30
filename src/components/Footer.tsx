import { Link } from 'react-router-dom';
import { Headphones, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, ExternalLink, Code2, Database, ShoppingCart, Brain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      {/* Developer Credit Banner */}
      <div className="bg-gradient-to-r from-amber-400/10 via-amber-400/5 to-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400/20 rounded-full flex items-center justify-center">
                <Code2 className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Built by Sedin Šehić</p>
                <p className="text-white/50 text-xs">Python Automation Engineer | eCommerce, AI & Data Pipelines</p>
              </div>
            </div>
            <a
              href="https://www.upwork.com/freelancers/sedins"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              Hire me on Upwork
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Headphones className="w-7 h-7 text-amber-400" />
              <span className="text-xl font-bold text-white">NOCTA</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Premium audio equipment for those who demand the best. Experience sound like never before.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-amber-400 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-amber-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-amber-400 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-amber-400 transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-white/50 hover:text-amber-400 text-sm transition-colors">Shop All</Link></li>
              <li><Link to="/shop?category=headphones" className="text-white/50 hover:text-amber-400 text-sm transition-colors">Headphones</Link></li>
              <li><Link to="/shop?category=speakers" className="text-white/50 hover:text-amber-400 text-sm transition-colors">Speakers</Link></li>
              <li><Link to="/shop?category=earbuds" className="text-white/50 hover:text-amber-400 text-sm transition-colors">Earbuds</Link></li>
              <li><Link to="/blog" className="text-white/50 hover:text-amber-400 text-sm transition-colors">Blog</Link></li>
              <li><Link to="/wishlist" className="text-white/50 hover:text-amber-400 text-sm transition-colors">My Wishlist</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/50 hover:text-amber-400 text-sm transition-colors">FAQ</a></li>
              <li><a href="#" className="text-white/50 hover:text-amber-400 text-sm transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-white/50 hover:text-amber-400 text-sm transition-colors">Returns</a></li>
              <li><a href="#" className="text-white/50 hover:text-amber-400 text-sm transition-colors">Warranty</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <Mail className="w-4 h-4 text-amber-400" />
                support@nocta.com
              </li>
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <Phone className="w-4 h-4 text-amber-400" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5" />
                123 Audio Lane, Los Angeles, CA 90210
              </li>
            </ul>
          </div>
        </div>

        {/* About the Developer - Portfolio Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-amber-400" />
                  About the Developer
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  This e-commerce platform was designed and developed by <strong className="text-white">Sedin Šehić</strong> — 
                  a Python Automation Engineer specializing in eCommerce systems, AI integrations, and data pipelines. 
                  The project demonstrates full-stack frontend capabilities including complex state management, 
                  responsive UI/UX design, and production-ready e-commerce logic.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: ShoppingCart, label: 'eCommerce' },
                    { icon: Brain, label: 'AI & Automation' },
                    { icon: Database, label: 'Data Pipelines' },
                    { icon: Code2, label: 'Full-Stack Dev' },
                  ].map((skill) => (
                    <span key={skill.label} className="inline-flex items-center gap-1.5 bg-amber-400/10 text-amber-400 text-xs px-3 py-1.5 rounded-full">
                      <skill.icon className="w-3 h-3" />
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="https://www.upwork.com/freelancers/sedins"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                View My Upwork Profile
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">2025 NOCTA Audio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
