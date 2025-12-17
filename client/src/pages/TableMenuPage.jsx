import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, ensureGuestToken } from '../api.js';
import MenuItemCard from '../components/MenuItemCard.jsx';

export default function TableMenuPage() {
  const { tableNumber } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    // Persist table number for downstream pages (cart, order)
    localStorage.setItem('tableNumber', String(tableNumber));
    ensureGuestToken(Number(tableNumber)).catch(console.error);
  }, [tableNumber]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api('/menus')
      .then((data) => {
        if (isMounted) setItems(data);
      })
      .catch((e) => console.error(e))
      .finally(() => isMounted && setLoading(false));
    return () => (isMounted = false);
  }, []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))], [items]);
  const filtered = useMemo(() => (category === 'All' ? items : items.filter((i) => i.category === category)), [items, category]);

  return (
    <div>
      <h2>Table #{tableNumber}</h2>
      <div className="row mt-2" style={{ flexWrap: 'wrap' }}>
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={`pill ${c === category ? 'active' : ''}`}>
            {c}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="mt-3 text-muted">Loading menu…</div>
      ) : (
        <div className="grid mt-3">
          {filtered.map((it) => (
            <MenuItemCard key={it._id} item={it} />
          ))}
        </div>
      )}
      <div className="mt-3">
        <Link to="/cart" className="button">Go to Cart →</Link>
      </div>
    </div>
  );
}
