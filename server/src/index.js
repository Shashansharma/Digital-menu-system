import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import menuRoutes from './routes/menu.routes.js';
import orderRoutes from './routes/order.routes.js';
import tableRoutes from './routes/table.routes.js';
import kitchenRoutes from './routes/kitchen.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import qrRouter from './routes/qr.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// DB
await connectDB();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Health
app.get('/api/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/kitchen', kitchenRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/qr', qrRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Handle port in use errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Trying next port...`);
    const newPort = PORT + 1;
    const retryServer = app.listen(newPort, () => {
      console.log(`Server running on http://localhost:${newPort} (fallback)`);
    });
  } else {
    throw err;
  }
});
