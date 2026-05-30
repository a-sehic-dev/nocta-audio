# NOCTA Audio — Full-Stack E-Commerce Platform

> **Built by [Sedin Šehić](https://www.upwork.com/freelancers/sedins)**  
> Python Automation Engineer | eCommerce, AI & Data Pipelines

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-nocta--audio.vercel.app-green?style=for-the-badge)](https://nocta-audio.vercel.app)

A production-ready e-commerce web application for a premium audio equipment brand, featuring 109+ products, full shopping cart & checkout, customer reviews, blog, wishlist, and admin dashboard.

![NOCTA Audio Preview](./public/hero/hero-bg.jpg)

---

## Live Demo

**[https://nocta-audio.vercel.app](https://nocta-audio.vercel.app)**

**Admin Panel:** `/admin`  
**Demo Login:** `admin` / `admin123`

---

## Features

### Customer Experience
- **109 Products** across 5 categories with real-world pricing ($9.99–$899.99)
- **Advanced Filtering** — Category, price range, sort by price/rating/name
- **Product Pages** — Gallery, color selection, reviews, related products
- **Quick View** — Modal popup for rapid preview
- **Shopping Cart** — Persistent, quantity controls, free shipping over $100
- **2-Step Checkout** — Shipping + payment with order confirmation
- **Wishlist** — Save favorites for later
- **Customer Reviews** — Star ratings, verified badges, submit reviews
- **Blog** — 6 articles about audio technology
- **Recently Viewed** — Track browsing history
- **Fully Responsive** — Desktop, tablet, mobile

### Admin Dashboard
- **Analytics** — Revenue, orders, products, pending
- **Product CRUD** — Create, read, update, delete
- **Order Management** — Update order status

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| shadcn/ui | UI Components |
| Zustand | State Management |
| React Router | Client-side Routing |
| Lucide React | Icons |

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/a-sehic-dev/nocta-audio.git
cd nocta-audio

# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:5173
```

---

## Project Structure

```
├── public/               # Static assets (images)
│   ├── hero/
│   └── products/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/            # Route pages
│   ├── store/            # Zustand state management
│   ├── data/             # Products & blog data
│   ├── types/            # TypeScript types
│   └── hooks/            # Custom hooks
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Database Schema

```
Products        → id, name, price, category, stock, sales, views, rating...
Orders          → id, items, total, status, customer, paymentStatus...
CartItem        → product, quantity, color
Reviews         → id, productId, author, rating, text, verified, date
WishlistItem    → product, addedAt
```

---

## About the Developer

**Sedin Šehić** — Python Automation Engineer specializing in:
- eCommerce Development
- AI & Automation
- Data Pipelines
- Full-Stack Development

**[Hire me on Upwork →](https://www.upwork.com/freelancers/sedins)**

---

*Built with passion and attention to detail.*
