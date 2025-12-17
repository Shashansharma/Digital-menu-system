const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001/api';

const getToken = () => localStorage.getItem('token');

export function getTokenPayload() {
  const t = getToken();
  if (!t) return null;
  try {
    const [, payload] = t.split('.');
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function getRole() {
  return getTokenPayload()?.role || null;
}

export async function api(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const t = getToken();
    if (t) headers['Authorization'] = `Bearer ${t}`;
  }
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    // Attempt to read JSON error for clearer messages
    const ct = res.headers.get('content-type') || '';
    let message = `Request failed (${res.status})`;
    if (ct.includes('application/json')) {
      try {
        const data = await res.json();
        message = data?.message || message;
      } catch {}
    } else {
      const text = await res.text();
      if (text) message = text;
    }
    throw new Error(message);
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

export async function ensureGuestToken(tableNumber) {
  if (!getToken()) {
    const { token } = await api('/auth/guest', { method: 'POST', body: { tableNumber } });
    localStorage.setItem('token', token);
  }
}
