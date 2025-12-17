import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import HomePage from './pages/HomePage.jsx';
import TableMenuPage from './pages/TableMenuPage.jsx';
import CartPage from './pages/CartPage.jsx';
import OrderStatusPage from './pages/OrderStatusPage.jsx';
import SplitBillPage from './pages/SplitBillPage.jsx';
import ManagerDashboard from './pages/ManagerDashboard.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <header className="site-header">
          <div className="site-header-inner">
            <Link to="/" className="brand">MenuDirect</Link>
            <nav className="row">
              <Link to="/profile" title="User Profile">👤</Link>
              <Link to="/manager">Manager</Link>
            </nav>
          </div>
        </header>
        <main className="container">
          <Routes>
            {/* Home page */}
            <Route path="/" element={<HomePage />} />

            {/* User Profile */}
            <Route path="/profile" element={<UserProfilePage />} />

            {/* Customer flow */}
            <Route path="/table/:tableNumber" element={<TableMenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order/:orderId" element={<OrderStatusPage />} />
            <Route path="/order/:orderId/split" element={<SplitBillPage />} />

            {/* Manager */}
            <Route path="/manager" element={<ManagerDashboard />} />
          </Routes>
        </main>
      </CartProvider>
    </UserProvider>
  );
}
