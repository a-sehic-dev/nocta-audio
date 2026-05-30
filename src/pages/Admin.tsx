import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, ShoppingBag, LogOut,
  Plus, Edit, Trash2, X, Eye, TrendingUp, DollarSign,
  AlertCircle, Search, ChevronLeft
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { products as initialProducts } from '../data/products';
import type { Product } from '../types';

export default function Admin() {
  const navigate = useNavigate();
  const { isAdmin, login, logout, orders, updateOrderStatus, showToast } = useStore();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginForm.username, loginForm.password);
    if (success) {
      showToast('Welcome, Admin!', 'success');
    } else {
      showToast('Invalid credentials. Try admin / admin123', 'error');
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
      showToast('Product deleted', 'info');
    }
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      setProductList((prev) => prev.map((p) => (p.id === product.id ? product : p)));
      showToast('Product updated', 'success');
    } else {
      setProductList((prev) => [...prev, { ...product, id: String(Date.now()) }]);
      showToast('Product added', 'success');
    }
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const handleUpdateStatus = (orderId: string, status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    updateOrderStatus(orderId, status);
    showToast('Order status updated', 'success');
  };

  // Login screen
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Store
          </button>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-white/50 text-sm mb-6">Sign in to access the dashboard</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Username</label>
                <input
                  value={loginForm.username}
                  onChange={(e) => setLoginForm((f) => ({ ...f, username: e.target.value }))}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
                  placeholder="admin123"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-400 text-black py-3 rounded-full font-semibold hover:bg-amber-300 transition-colors"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4 flex items-start gap-2 text-white/30 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>Demo credentials: username: <strong>admin</strong> / password: <strong>admin123</strong></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = productList.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const filteredProducts = productList.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors = {
    pending: 'bg-yellow-400/20 text-yellow-400',
    processing: 'bg-blue-400/20 text-blue-400',
    shipped: 'bg-purple-400/20 text-purple-400',
    delivered: 'bg-green-400/20 text-green-400',
    cancelled: 'bg-red-400/20 text-red-400',
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-400' },
            { label: 'Orders', value: totalOrders, icon: ShoppingBag, color: 'text-blue-400' },
            { label: 'Products', value: totalProducts, icon: Package, color: 'text-amber-400' },
            { label: 'Pending', value: pendingOrders, icon: TrendingUp, color: 'text-yellow-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
              <p className="text-white/50 text-sm">{stat.label}</p>
              <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['dashboard', 'products', 'orders'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-amber-400 text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
            {orders.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <ShoppingBag className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/40">No orders yet</p>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-white/50 text-sm font-medium px-6 py-4">Order ID</th>
                      <th className="text-left text-white/50 text-sm font-medium px-6 py-4">Customer</th>
                      <th className="text-left text-white/50 text-sm font-medium px-6 py-4">Total</th>
                      <th className="text-left text-white/50 text-sm font-medium px-6 py-4">Status</th>
                      <th className="text-left text-white/50 text-sm font-medium px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-white text-sm font-mono">{order.id}</td>
                        <td className="px-6 py-4 text-white text-sm">{order.customer.firstName} {order.customer.lastName}</td>
                        <td className="px-6 py-4 text-amber-400 text-sm font-medium">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/50 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
              <button
                onClick={() => { setEditingProduct(null); setShowAddForm(true); }}
                className="flex items-center gap-2 bg-amber-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/50 text-sm font-medium px-6 py-4">Product</th>
                    <th className="text-left text-white/50 text-sm font-medium px-6 py-4">Category</th>
                    <th className="text-left text-white/50 text-sm font-medium px-6 py-4">Price</th>
                    <th className="text-left text-white/50 text-sm font-medium px-6 py-4">Stock</th>
                    <th className="text-right text-white/50 text-sm font-medium px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-neutral-900 rounded-lg overflow-hidden">
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-white text-sm">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white/60 text-sm capitalize">{product.category}</td>
                      <td className="px-6 py-4 text-amber-400 text-sm font-medium">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${product.inStock ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'}`}>
                          {product.inStock ? 'In Stock' : 'Out'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="p-2 text-white/40 hover:text-amber-400 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => { setEditingProduct(product); setShowAddForm(true); }}
                            className="p-2 text-white/40 hover:text-blue-400 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-white/40 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">All Orders</h2>
            {orders.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <ShoppingBag className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/40">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-white font-mono text-sm">{order.id}</p>
                        <p className="text-white/50 text-xs">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                        <span className="text-amber-400 font-bold">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="border-t border-white/5 pt-4">
                      <p className="text-white/60 text-sm mb-2">
                        {order.customer.firstName} {order.customer.lastName} · {order.customer.email}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {order.items.map((item) => (
                          <span key={item.product.id} className="text-xs bg-white/5 text-white/40 px-3 py-1 rounded-full">
                            {item.product.name} x{item.quantity}
                          </span>
                        ))}
                      </div>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled')}
                        className="bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Product Form Modal
  if (showAddForm) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h2>
            <button
              onClick={() => { setShowAddForm(false); setEditingProduct(null); }}
              className="text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => { setShowAddForm(false); setEditingProduct(null); }}
          />
        </div>
      </div>
    );
  }

  return null;
}

// Product Form Component
function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product | null;
  onSave: (p: Product) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Product>(
    product || {
      id: '',
      name: '',
      price: 0,
      category: 'headphones',
      image: '/products/placeholder.jpg',
      images: ['/products/placeholder.jpg'],
      description: '',
      features: [],
      inStock: true,
      stock: 50,
      sales: 0,
      views: 0,
      rating: 5,
      reviews: 0,
    }
  );

  const [featureInput, setFeatureInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setForm((f) => ({ ...f, features: [...f.features, featureInput.trim()] }));
      setFeatureInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-white/60 text-sm mb-1 block">Name *</label>
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-white/60 text-sm mb-1 block">Price *</label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
            required
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="text-white/60 text-sm mb-1 block">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Product['category'] }))}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400"
          >
            <option value="headphones">Headphones</option>
            <option value="speakers">Speakers</option>
            <option value="earbuds">Earbuds</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-white/60 text-sm mb-1 block">Image URL</label>
        <input
          value={form.image}
          onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400"
        />
      </div>
      <div>
        <label className="text-white/60 text-sm mb-1 block">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={3}
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400 resize-none"
        />
      </div>
      <div>
        <label className="text-white/60 text-sm mb-1 block">Features</label>
        <div className="flex gap-2">
          <input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            placeholder="Add feature and press Enter"
            className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400"
          />
          <button type="button" onClick={addFeature} className="bg-amber-400 text-black px-4 py-2 rounded-xl font-medium hover:bg-amber-300">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {form.features.map((f, i) => (
            <span key={i} className="bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              {f}
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, features: prev.features.filter((_, idx) => idx !== i) }))}
                className="text-white/40 hover:text-red-400"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-amber-400 text-black py-3 rounded-full font-semibold hover:bg-amber-300 transition-colors"
        >
          {product ? 'Update' : 'Create'} Product
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
