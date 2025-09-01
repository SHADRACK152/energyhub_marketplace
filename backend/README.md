# EnergyHub Marketplace Backend

This is the Node.js/Express backend for the EnergyHub Marketplace project, integrated with TiDB Serverless.

## Setup

1. Copy `.env.example` to `.env` and fill in your TiDB credentials.
2. Install dependencies:
   npm install
3. Start the server:
   npm run dev

## Endpoints
- `GET /api/health` — Health check
- `GET /api/products` — List all products
- `POST /api/products` — Create a new product

Extend with authentication, orders, and user endpoints as needed.
