# React
# EnergyHub Marketplace

A modern, full-featured B2B/B2C energy marketplace built with React, Vite, and Tailwind CSS.

## Features

- **Landing Page:** Visually rich, modern, and attractive homepage with product categories, testimonials, and trust signals.
- **Authentication:** Secure login/register, password strength meter, forgot password modal, and user context.
- **Role-Based Dashboards:**
  - **Buyer Dashboard:** Personalized stats, order summary, wishlist, and recommendations.
  - **Seller Dashboard:** Inventory management, sales metrics, low inventory alerts, and quick actions.
- **Product Catalog & Search:**
  - Advanced sidebar filters (category, price, brand, etc.)
  - Quick View modal, product Q&A, and social sharing.
  - Add to cart with animation and toast notification.
- **Shopping Cart & Checkout:**
  - Global cart state, quantity updates, and removal.
  - Multi-step checkout: Cart Review → Shipping → Payment → Review.
  - Promo code support, order summary, and modern UI.
- **Order Management:**
  - Order history, order details, and status tracking.
- **Mobile-First Design:**
  - Responsive layouts, mobile tab bar, and touch-friendly UI.
- **Error Boundaries:**
  - Graceful error handling and user feedback.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router
- **Backend:** Node.js/Express (API), Supabase (auth & data)
- **Other:**
  - Custom UI components (Button, Input, Checkbox, etc.)
  - Toast notifications
  - Fly-to-cart animation

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

- `src/pages/` — Main app pages (landing, dashboard, catalog, checkout, etc.)
- `src/components/` — Shared and UI components
- `src/utils/` — Utility functions and hooks
- `public/` — Static assets

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
