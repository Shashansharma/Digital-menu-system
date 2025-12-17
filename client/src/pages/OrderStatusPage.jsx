import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api.js';

export default function OrderStatusPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api(`/orders/${orderId}`)
      .then((o) => isMounted && setOrder(o))
      .catch(console.error)
      .finally(() => isMounted && setLoading(false));
    return () => (isMounted = false);
  }, [orderId]);

  if (loading) return <div className="text-muted">Loading…</div>;
  if (!order) return <div className="text-muted">Order not found.</div>;

  return (
    <div>
      <h2>Order #{order._id.slice(-6)}</h2>
      <div className="mt-1">Status: <b>{order.status}</b></div>
      <div className="mt-1 text-muted">Table: {order.tableNumber}</div>
      <div className="card mt-3">
        <div className="list">
          {order.items.map((it, idx) => (
            <div key={idx} className="list-item">
              <div className="text-strong">{it.name} × {it.quantity}</div>
              <div className="text-muted">₹ {it.lineTotal.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-strong">Total: ₹ {order.total.toFixed(2)}</div>
      </div>
      <div className="mt-3">
        <Link to={`/order/${orderId}/split`} className="button">Split Bill →</Link>
      </div>
    </div>
  );
}
