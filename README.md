# NexusTech — Premium PC Hardware Store

A production-grade, fully responsive e-commerce website for a tech hardware store. Built with Next.js 15 App Router, TypeScript, Tailwind CSS v4, and shadcn/ui.

## ✨ Features

- 🏠 **Home Page** — Hero with gradient mesh, featured products, category grid, brand strip, newsletter
- 🛒 **Shop** — Category/product listing page with filters & sort
- 📦 **Product Detail** — Image gallery, specs tab, reviews, add to cart/wishlist
- 🛍️ **Cart** — Persistent cart with quantity controls, promo code, order summary
- 💳 **Checkout** — Multi-step flow: Shipping → Payment → Review → Confirmation
- ❤️ **Wishlist** — Persistent wishlist with add/remove
- 👤 **Account Dashboard** — Order history, addresses, saved payment methods
- 🔐 **Auth** — Login, Register pages (NextAuth-ready)
- ⚙️ **Admin Panel** — Products CRUD, Order management, Sales overview
- 🔍 **Global Search** — Full-screen overlay with live autocomplete
- 🌙 **Dark/Light Mode** — Dark by default with next-themes toggle
- 📱 **Fully Responsive** — Mobile-first, tested at 375px, 768px, 1024px, 1440px

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| State | Zustand (persisted via localStorage) |
| Auth | NextAuth.js v4 (ready to configure) |
| Payments | Stripe (test-mode placeholders) |
| Icons | lucide-react |
| Toasts | sonner |
| Forms | react-hook-form + zod |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout (Navbar, Footer, ThemeProvider)
│   ├── category/[slug]/    # Product Listing Page (PLP)
│   ├── product/[id]/       # Product Detail Page (PDP)
│   ├── cart/               # Cart page
│   ├── checkout/           # Multi-step checkout
│   ├── wishlist/           # Wishlist page
│   ├── account/            # User dashboard
│   ├── admin/              # Admin dashboard
│   ├── login/              # Login page
│   ├── register/           # Register page
│   ├── about/              # About Us
│   ├── contact/            # Contact Us
│   └── faq/                # FAQ page
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── product/            # ProductCard, PriceTag, RatingStars
│   ├── ui/                 # shadcn/ui components
│   └── theme-provider.tsx
├── data/
│   └── mock.ts             # Mock product data (swap with DB later)
├── hooks/
│   ├── useCart.ts          # Zustand cart store (persisted)
│   └── useWishlist.ts      # Zustand wishlist store (persisted)
└── types/
    └── index.ts            # TypeScript interfaces
```

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/connectwithvanshika/PC-building-ecommerce.git
cd PC-building-ecommerce

# 2. Install dependencies
npm install

# 3. Copy env variables
cp .env.example .env.local
# Fill in your Stripe, NextAuth, and DB credentials

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🔑 Placeholder Items to Replace

| Item | Where | Notes |
|------|-------|-------|
| Product images | `src/data/mock.ts` → each product's `images: []` | Currently Unsplash stock photos |
| Stripe keys | `.env.local` | Get from [dashboard.stripe.com](https://dashboard.stripe.com) |
| Google OAuth | `.env.local` | Get from [console.cloud.google.com](https://console.cloud.google.com) |
| NextAuth secret | `.env.local` | Run: `openssl rand -base64 32` |
| Database URL | `.env.local` | Connect a real PostgreSQL/MongoDB DB |
| Analytics ID | `layout.tsx` | Add Google Analytics / PostHog |
| Domain | All meta tags | Replace `localhost:3000` with production domain |

## 🎨 Design System

- **Background**: Deep charcoal (`oklch(0.13 0.01 250)`)
- **Accent**: Electric blue (`oklch(0.65 0.15 250)`)
- **Font**: Geist Sans (Next.js default)
- **Border radius**: 0.5rem base

## 📝 License

MIT — built for educational and commercial use.
