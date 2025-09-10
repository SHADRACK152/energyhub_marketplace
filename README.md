<div align="center">

# ⚡ EnergyHub Marketplace

### 🌟 Modern B2B/B2C Energy Trading Platform

[![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22.16.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

*A sophisticated, full-featured energy marketplace connecting buyers and sellers in the renewable energy ecosystem.*

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## 🎯 Overview

EnergyHub Marketplace is a cutting-edge platform designed to revolutionize the energy trading industry. Built with modern web technologies, it provides a seamless experience for both B2B and B2C transactions in the renewable energy sector.

**🆕 Latest Update:** Now powered by SQLite for enhanced reliability and local development experience!

## ✨ Key Features

### 🏠 **Landing Experience**
- 🎨 Visually stunning homepage with modern design
- 📱 Mobile-first responsive layouts
- 🏆 Trust signals and customer testimonials
- 🔍 Product category showcases

### 🔐 **Authentication & Security**
- 🛡️ Secure JWT-based authentication
- 🔒 bcrypt password encryption
- 💪 Password strength validation
- � Role-based access control (Buyer/Seller)
- �️ Local SQLite user management

### 📊 **Smart Dashboards**
- **👥 Buyer Dashboard**
  - 📈 Personalized analytics and stats
  - 📋 Order summary and history
  - ❤️ Wishlist management
  - 🎯 AI-powered recommendations

- **🏢 Seller Dashboard**
  - 📦 Advanced inventory management
  - 💰 Real-time sales metrics
  - ⚠️ Smart low inventory alerts
  - ⚡ Quick action panels

### 🛍️ **Product Catalog & Search**
- 🔍 Advanced filtering system
- 👁️ Quick View modals
- ❓ Product Q&A system
- 📱 Social sharing integration
- 🛒 Animated cart interactions

### 💳 **Checkout & Payments**
- 🛒 Global cart state management
- 📝 Multi-step checkout process
- 🎫 B2B/B2C cross-platform promo codes
- 💰 Comprehensive order summaries
- 📊 Real-time order tracking

### 📱 **Mobile Experience**
- 📲 Touch-friendly interface
- 🗂️ Mobile tab navigation
- 📱 Responsive design patterns

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Database | Security |
|----------|---------|----------|----------|
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) | ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | ![SQLite](https://img.shields.io/badge/-SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white) | ![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white) |
| ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | ![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white) | ![Local DB](https://img.shields.io/badge/-Local_Database-4CAF50?style=flat-square) | ![bcrypt](https://img.shields.io/badge/-bcrypt-FF6B35?style=flat-square) |
| ![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | ![Multer](https://img.shields.io/badge/-Multer-FF6600?style=flat-square) | | ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |

</div>

## 🚀 Quick Start

### Prerequisites
- 📦 Node.js (v18 or higher)
- 📦 npm or yarn
- � Local development environment (no external database required!)

### Installation

1. **📥 Clone the repository**
   ```bash
   git clone https://github.com/SHADRACK152/energyhub_marketplace.git
   cd energyhub_marketplace
   ```

2. **📦 Install dependencies**
   ```bash
   npm install
   # Install backend dependencies
   cd backend && npm install && cd ..
   ```

3. **🔧 Environment Setup (Optional)**
   ```bash
   # Environment file is optional - SQLite works out of the box!
   # Create only if you need custom JWT secrets
   cp .env.example .env
   ```

4. **🚀 Start development servers**
   ```bash
   npm run dev
   ```

5. **🌐 Open your browser**
   
   Navigate to [http://localhost:4028](http://localhost:4028)

---

## 📁 Project Architecture

```
energyhub_marketplace/
├── 🎯 src/
│   ├── 📄 pages/           # Application pages
│   │   ├── 🏠 landing-page/
│   │   ├── 🔐 authentication-login-register/
│   │   ├── 🏢 b2b-seller-dashboard/
│   │   ├── 👥 b2c-buyer-dashboard/
│   │   ├── 📦 b2b-inventory-management/
│   │   ├── 🛍️ product-catalog-search/
│   │   ├── 🛒 shopping-cart-checkout/
│   │   └── 📱 mobile/
│   ├── 🧩 components/      # Reusable components
│   │   ├── 🎨 ui/          # UI components
│   │   └── 🔧 shared/      # Shared utilities
│   ├── 🎨 styles/          # CSS and styling
│   └── 🛠️ utils/           # Helper functions
├── 🖥️ backend/            # Express.js API
│   ├── 🛣️ routes/         # API routes
│   ├── 📁 uploads/        # File storage
│   ├── 🗄️ database.js     # SQLite configuration
│   └── 💾 energyhub.db    # Local SQLite database
└── 🌐 public/            # Static assets
```

## 🎨 UI Components

Our custom-built component library includes:

- **🔘 Button** - Multiple variants and sizes
- **📝 Input** - Form inputs with validation
- **☑️ Checkbox** - Custom styled checkboxes
- **📋 Select** - Dropdown selections
- **🍞 Toast** - Notification system
- **🧭 Navigation** - Breadcrumbs and headers
- **📱 Mobile** - Touch-friendly components

## � What's New - SQLite Migration

### 🗄️ **Local Database Advantages**
- ✅ **Zero Configuration** - Works out of the box
- ⚡ **Lightning Fast** - No network latency
- 🛡️ **Enhanced Reliability** - No external dependencies
- 💻 **Perfect for Development** - Complete local environment
- 🔄 **Easy Backup** - Single file database

### 📊 **Complete Feature Set**
- 🛍️ **Products Management** - Full CRUD operations
- 🎫 **Promo Codes System** - B2B/B2C cross-platform support
- 📦 **Order Management** - Real-time order tracking
- 👥 **User Authentication** - Secure JWT + bcrypt
- ❓ **Q&A System** - Product questions and answers

## �🌟 Features Showcase

### 🛡️ Security Features
- 🔐 JWT-based authentication with bcrypt encryption
- 🔒 Secure password hashing and validation
- 🛡️ Role-based permissions (Buyer/Seller)
- 🔍 Input validation and sanitization
- 🗄️ Local SQLite database security

### 📈 Performance Optimizations
- ⚡ Vite for lightning-fast builds
- 🎯 Code splitting and lazy loading
- 🖼️ Image optimization
- 📱 Progressive Web App features
- 🗄️ SQLite for ultra-fast local queries
- 💾 Efficient file-based persistence

### 🎯 User Experience
- 🎨 Modern, intuitive interface
- 📱 Mobile-first design
- ♿ Accessibility compliant
- 🌐 Cross-browser compatibility

## 🗄️ Database Schema

The SQLite database includes the following tables:

```sql
📦 products         # Product catalog with specifications
🎫 promo_codes     # B2B/B2C promotional codes
📋 orders          # Order management and tracking
👥 users           # User authentication and profiles
❓ product_qna     # Product questions and answers
```

### 🔄 Latest Updates (September 2025)
- ✅ **Complete SQLite Migration** - Enhanced reliability and performance
- 🔐 **Improved Authentication** - JWT + bcrypt security
- 🎫 **Cross-Platform Promo Codes** - B2B/B2C integration
- 📱 **Enhanced Mobile Experience** - Touch-friendly interfaces
- 🛡️ **Local Database Security** - No external dependencies

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **💾 Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **📤 Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **🔄 Open a Pull Request**

### 📋 Development Guidelines
- 📝 Follow the existing code style
- ✅ Write tests for new features
- 📖 Update documentation as needed
- 🧪 Ensure all tests pass

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🌟 Star this repository if you found it helpful!

**Made with ❤️ by the EnergyHub Team**

[⬆ Back to Top](#-energyhub-marketplace)

</div>
