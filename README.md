# MenuDirect (MERN) – QR Digital Menu & Table Ordering

A beginner-friendly MERN stack app for restaurants to serve QR-based dine‑in menus, table ordering, kitchen tickets, and manager analytics.

## Features
- **QR menu by table**: Scan QR → open `/table/:tableNumber`.
- **Browse & customize**: View categories, add items to cart.
- **Place orders**: Creates order with live status.
- **Split bill**: Equal split per person.
- **Roles & JWT**: Customer (guest), Waiter, Manager.
- **Manager dashboard**: Menu CRUD, analytics (top items, peak hours), QR generator.

## Tech
- **Frontend**: React + Vite, React Router.
- **Backend**: Node.js + Express, JWT auth, QR Code generation.
- **Database**: MongoDB (Mongoose models).

## Monorepo Structure
- `server/` – Express API, MongoDB models, routes, controllers.
- `client/` – React app with routes and pages.

## Quick Start

### 1) Prerequisites
- Node.js 18+
- MongoDB running locally (default `mongodb://localhost:27017`)

### 2) Backend setup
```bash
# In server/
cp .env.example .env
# (edit .env if needed)

npm install
npm run dev
# Server will start on http://localhost:5000
```

### 3) Frontend setup
```bash
# In client/
cp .env.example .env
# (edit VITE_API_BASE if needed)

npm install
npm run dev
# Frontend will start on http://localhost:5173
```

### 4) Open the app
- Customer flow (demo): http://localhost:5173/table/12
- Manager dashboard: http://localhost:5173/manager

## Demo Flow
- **Generate QR** (Manager): In Dashboard → QR Generator → enter table number (e.g., 12) → Generate → scan/open link.
- **Add Menu Items** (Manager): In Dashboard → Menu section → add a few items (e.g., Paneer Tikka ₹300, Lemonade ₹100).
- **Customer Order**: Visit `/table/12` → add items → Cart → Place Order.
- **Kitchen** (Waiter/Manager): Call API `/api/kitchen/queue` with JWT to see queue; advance via `/api/kitchen/:id/advance`.
- **Split Bill**: After placing order, open the order page → Split Bill.
- **Analytics** (Manager): Dashboard → Refresh analytics.

## API Overview
- `POST /api/auth/guest` → customer JWT for a table session.
- `POST /api/auth/register`, `POST /api/auth/login` → manager login (demo register enabled).
- `GET/POST/PUT/DELETE /api/menus` → menu CRUD (manager only for write operations).
- `POST /api/orders` → create order (requires any JWT, guest OK).
- `GET /api/orders/:id` → get order.
- `POST /api/orders/:id/split` → split equally by `parts`.
- `PATCH /api/orders/:id/status` → waiter/manager can update status.
- `GET /api/kitchen/queue`, `PATCH /api/kitchen/:id/advance` → kitchen ticket flow (waiter/manager).
- `GET /api/analytics/top-items`, `/api/analytics/peak-hours` → manager analytics.
- `GET /api/qr/table/:tableNumber` → returns QR image data URL and deep link.

## Security Notes (for demo)
- Manager registration is open for convenience; lock it down in production.
- Guest auth issues a customer JWT without identity proof; in production, use short‑lived tokens + server table session.
- CORS allows the dev client origin by default.

## Extensibility Ideas
- Inventory auto‑deduct and low‑stock alerts.
- Table waitlist and paging.
- Loyalty points and rewards.
- Feedback surveys after order served.
- Realtime updates (WebSocket) for statuses.

## Troubleshooting
- Ensure MongoDB is running and `MONGO_URI` is correct in `server/.env`.
- If you get CORS errors, verify `CLIENT_URL` in `server/.env` matches the frontend URL.
- Use `/api/health` to verify server is up.
