
# EnergyHub Marketplace Backend

Node.js/Express backend for the EnergyHub Marketplace, providing RESTful APIs for authentication, products, cart, orders, and Q&A.

## Setup

1. Copy `.env.example` to `.env` if you want to override defaults (optional). This backend uses the local SQLite database by default.
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the server:
    ```sh
    npm run dev
    ```

## Main API Routes

- **Auth:**
   - `POST /api/register` — Register a new user
   - `POST /api/login` — Login and receive JWT

- **Products:**
   - `GET /api/products` — List all products
   - `GET /api/products/:id` — Get product details
   - `POST /api/products` — Create a new product (seller only)
   - `PUT /api/products/:id` — Update product (seller only)
   - `DELETE /api/products/:id` — Delete product (seller only)

- **Cart:**
   - `GET /api/cart` — Get current user's cart
   - `POST /api/cart` — Add/update item in cart
   - `DELETE /api/cart/:itemId` — Remove item from cart

- **Orders:**
   - `GET /api/orders` — List user orders
   - `POST /api/orders` — Place a new order
   - `GET /api/orders/:id` — Get order details

- **Q&A:**
   - `GET /api/products/:id/qna` — Get Q&A for a product
   - `POST /api/products/:id/qna` — Post a question or answer

## Notes

- Uses local SQLite (`energyhub.db`) for data storage and falls back to file-based persistence for some in-memory features.
- Supabase-related configuration and dependencies have been removed; all APIs now use SQLite.
- Extend with more endpoints as needed for your business logic.

## License

MIT
