export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'headphones' | 'speakers' | 'earbuds' | 'microphones' | 'accessories';
  image: string;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  stock: number;
  sales: number;
  views: number;
  rating: number;
  reviews: number;
  badge?: string;
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  verified: boolean;
  date: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customer: CustomerInfo;
  createdAt: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface AdminUser {
  username: string;
  password: string;
  role: 'admin';
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}
