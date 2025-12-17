import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { api } from '../api.js';

export default function CartPage() {
  const { items, removeItem, clear, subtotal } = useCart();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const placeOrder = async () => {
    setError('');
    setPlacing(true);
    try {
      const tableNumber = Number(localStorage.getItem('tableNumber')) || 1;
      const payload = {
        tableNumber,
        items: items.map((it) => ({
          menuItem: it.menuItem,
          quantity: it.quantity || 1,
          customizations: it.customizations || [],
        })),
      };
      const order = await api('/orders', { method: 'POST', auth: true, body: payload });
      clear();
      navigate(`/order/${order._id}`);
    } catch (e) {
      setError('Failed to place order');
      console.error(e);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <div className="text-muted mt-2">Your cart is empty.</div>
      ) : (
        <div className="card mt-2">
          <div className="list">
            {items.map((it, idx) => (
              <div key={idx} className="list-item" style={{ gap: 12, alignItems: 'center' }}>
                <img
                  src={it.imageUrl || '/images/placeholder-food.svg'}
                  alt={it.name}
                  className="thumb"
                  onError={(e) => { e.currentTarget.src = '/images/placeholder-food.svg'; }}
                />
                <div style={{ flex: 1 }}>
                  <div className="text-strong">{it.name}</div>
                  <div className="text-muted" style={{ fontSize: 13 }}>Qty: {it.quantity}</div>
                </div>
                <button onClick={() => removeItem(idx)} className="button danger">Remove</button>
              </div>
            ))}
          </div>
          <div className="mt-3 text-strong">Subtotal: ₹ {subtotal.toFixed(2)}</div>
          <button onClick={placeOrder} disabled={placing} className="button primary mt-2">
            {placing ? 'Placing…' : 'Place Order'}
          </button>
          {error && <div className="mt-2" style={{ color: 'crimson' }}>{error}</div>}
        </div>
      )}
    </div>
  );
}
