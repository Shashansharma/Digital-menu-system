import React, { useEffect, useState } from 'react';
import { api, getRole } from '../api.js';

export default function ManagerDashboard() {
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('manager@example.com');
  const [password, setPassword] = useState('password');
  const [name, setName] = useState('Manager');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: 0, category: '', description: '', imageUrl: '' });

  const [topItems, setTopItems] = useState([]);
  const [peakHours, setPeakHours] = useState([]);
  const [qr, setQr] = useState(null);
  const [tableNumber, setTableNumber] = useState(12);
  const [editingId, setEditingId] = useState(null);
  const [editingUrl, setEditingUrl] = useState('');

  const role = getRole();
  const loggedIn = role === 'manager';

  useEffect(() => {
    if (!loggedIn) return;
    api('/menus')
      .then(setMenu)
      .catch(console.error);
  }, [loggedIn]);

  const handleAuth = async () => {
    try {
      if (authMode === 'login') {
        const { token } = await api('/auth/login', { method: 'POST', body: { email, password } });
        localStorage.setItem('token', token);
        setToken(token);
      } else {
        const { token } = await api('/auth/register', { method: 'POST', body: { name, email, password, role: 'manager' } });
        localStorage.setItem('token', token);
        setToken(token);
      }
    } catch (e) {
      alert(e.message || 'Auth failed');
    }
  };

  const createItem = async () => {
    try {
      const item = await api('/menus', { method: 'POST', auth: true, body: newItem });
      setMenu((prev) => [item, ...prev]);
      setNewItem({ name: '', price: 0, category: '', description: '', imageUrl: '' });
    } catch (e) {
      alert(e.message || 'Create failed');
    }
  };

  const deleteItem = async (id) => {
    try {
      await api(`/menus/${id}`, { method: 'DELETE', auth: true });
      setMenu((prev) => prev.filter((i) => i._id !== id));
    } catch (e) {
      alert(e.message || 'Delete failed');
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditingUrl(item.imageUrl || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingUrl('');
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      const updated = await api(`/menus/${editingId}`, { method: 'PUT', auth: true, body: { imageUrl: editingUrl } });
      setMenu((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
      setEditingId(null);
      setEditingUrl('');
    } catch (e) {
      alert(e.message || 'Update failed');
    }
  };

  const loadAnalytics = async () => {
    try {
      const [tops, peaks] = await Promise.all([
        api('/analytics/top-items', { auth: true }),
        api('/analytics/peak-hours', { auth: true }),
      ]);
      setTopItems(tops);
      setPeakHours(peaks);
    } catch (e) {
      alert(e.message || 'Analytics failed');
    }
  };

  const genQR = async () => {
    try {
      const res = await api(`/qr/table/${tableNumber}`);
      setQr(res);
    } catch (e) {
      alert(e.message || 'QR failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div>
      <h2>Manager Dashboard</h2>
      {!loggedIn ? (
        <div className="card">
          <div className="row mb-2">
            <button onClick={() => setAuthMode('login')} className={`pill ${authMode==='login' ? 'active' : ''}`}>Login</button>
            <button onClick={() => setAuthMode('register')} className={`pill ${authMode==='register' ? 'active' : ''}`}>Register</button>
          </div>
          {authMode === 'register' && (
            <div className="row">
              <label className="text-strong" style={{ minWidth: 120 }}>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
            </div>
          )}
          <div className="row mt-2">
            <label className="text-strong" style={{ minWidth: 120 }}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
          </div>
          <div className="row mt-2">
            <label className="text-strong" style={{ minWidth: 120 }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
          </div>
          <button onClick={handleAuth} className="button primary mt-3">Continue</button>
        </div>
      ) : (
        <div>
          <div className="row-between mb-2">
            <div className="badge">Manager</div>
            <button onClick={logout} className="button">Logout</button>
          </div>

          <section style={{ marginBottom: 24 }}>
            <h3>Menu</h3>
            <div className="card">
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 2fr 2fr auto', alignItems: 'center' }}>
                <input placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="input" />
                <input placeholder="Price" type="number" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })} className="input" />
                <input placeholder="Category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} className="input" />
                <input placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} className="input" />
                <input placeholder="Image URL (optional)" value={newItem.imageUrl} onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })} className="input" />
                <button onClick={createItem} className="button primary">Add</button>
              </div>
            </div>
            <div className="list mt-2">
              {menu.map((m) => (
                <div key={m._id} className="list-item" style={{ gap: 12, alignItems: 'center' }}>
                  {(m.imageUrl || (editingId === m._id && editingUrl)) && (
                    <img src={editingId === m._id ? (editingUrl || '/images/placeholder-food.svg') : m.imageUrl}
                         alt={m.name}
                         className="thumb"
                         onError={(e) => { e.currentTarget.src = '/images/placeholder-food.svg'; }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div className="row-between">
                      <div className="text-strong">{m.name} - ₹ {m.price}</div>
                      <div className="text-muted" style={{ fontSize: 13 }}>{m.category}</div>
                    </div>
                    {editingId === m._id ? (
                      <div className="row mt-2" style={{ alignItems: 'center', gap: 8 }}>
                        <input
                          className="input"
                          placeholder="Image URL"
                          value={editingUrl}
                          onChange={(e) => setEditingUrl(e.target.value)}
                        />
                      </div>
                    ) : (
                      m.imageUrl && <div className="text-muted" style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.imageUrl}</div>
                    )}
                  </div>
                  {editingId === m._id ? (
                    <div className="row" style={{ gap: 8 }}>
                      <button onClick={saveEdit} className="button primary">Save</button>
                      <button onClick={cancelEdit} className="button">Cancel</button>
                    </div>
                  ) : (
                    <div className="row" style={{ gap: 8 }}>
                      <button onClick={() => startEdit(m)} className="button">Edit Image</button>
                      <button onClick={() => deleteItem(m._id)} className="button danger">Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 24 }}>
            <h3>Analytics</h3>
            <button onClick={loadAnalytics} className="button mt-2">Refresh</button>
            <div className="row mt-2" style={{ alignItems: 'stretch' }}>
              <div className="card" style={{ flex: 1 }}>
                <div className="text-strong">Top Items</div>
                <div className="list mt-2">
                  {topItems.map((i) => (
                    <div key={i._id} className="list-item">
                      <div>{i.name}</div>
                      <div>Sold: {i.soldCount}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ flex: 1 }}>
                <div className="text-strong">Peak Hours</div>
                <div className="list mt-2">
                  {peakHours.map((p) => (
                    <div key={p._id} className="list-item">
                      <div>{p._id}:00</div>
                      <div>Orders: {p.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3>QR Generator</h3>
            <div className="row">
              <input type="number" min={1} value={tableNumber} onChange={(e) => setTableNumber(Number(e.target.value))} className="input" style={{ maxWidth: 160 }} />
              <button onClick={genQR} className="button">Generate</button>
            </div>
            {qr && (
              <div className="card mt-2" style={{ textAlign: 'center' }}>
                <div>Link: <a href={qr.link} target="_blank" rel="noreferrer">{qr.link}</a></div>
                <img src={qr.dataUrl} alt="QR" style={{ marginTop: 8, width: 200, height: 200 }} />
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
