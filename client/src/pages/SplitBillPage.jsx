import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api.js';

export default function SplitBillPage() {
  const { orderId } = useParams();
  const [parts, setParts] = useState(2);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const split = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await api(`/orders/${orderId}/split`, { method: 'POST', body: { parts: Number(parts) } });
      setResult(data);
    } catch (e) {
      setError('Failed to split bill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Split Bill</h2>
      <div className="card mt-2">
        <div className="row">
          <label className="text-strong">Number of people:</label>
          <input type="number" min={2} value={parts} onChange={(e) => setParts(e.target.value)} className="input" style={{ maxWidth: 140 }} />
          <button onClick={split} disabled={loading} className="button primary">{loading ? 'Calculating…' : 'Calculate'}</button>
        </div>
        {error && <div className="mt-2" style={{ color: 'crimson' }}>{error}</div>}
        {result && (
          <div className="mt-3">
            <div className="text-muted">Parts: {result.parts}</div>
            <div className="text-strong mt-1">Each pays: ₹ {result.share.toFixed(2)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
