import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function MenuItemCard({ item }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const onAdd = () => {
    addItem({
      menuItem: item._id,
      name: item.name,
      basePrice: item.price,
      quantity: qty,
      imageUrl: item.imageUrl,
      customizations: [], // simplified; extend to map item.customization
    });
  };

  return (
    <div className="card">
      <div className="row">
        <img
          src={item.imageUrl || '/images/placeholder-food.svg'}
          alt={item.name}
          className="thumb"
          onError={(e) => {
            if (e.currentTarget.src.endsWith('/images/placeholder-food.svg')) return;
            e.currentTarget.src = '/images/placeholder-food.svg';
          }}
        />
        <div style={{ flex: 1 }}>
          <div className="row-between">
            <div className="text-strong" style={{ fontSize: 16 }}>{item.name}</div>
            <div className="badge">₹ {item.price}</div>
          </div>
          {item.description && <div className="text-muted mt-1" style={{ fontSize: 13 }}>{item.description}</div>}
          <div className="row mt-2">
            <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} className="input" style={{ width: 90 }} />
            <button onClick={onAdd} className="button primary" disabled={!item.isAvailable}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
