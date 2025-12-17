import React, { createContext, useContext, useMemo, useState } from 'react';

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {menuItem, name, basePrice, quantity, customizations:[{label, priceDelta}]}

  const addItem = (item) => {
    setItems((prev) => {
      // naive push; in real app merge similar lines
      return [...prev, item];
    });
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clear = () => setItems([]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => {
      const delta = (it.customizations || []).reduce((s, c) => s + (c.priceDelta || 0), 0);
      return sum + (it.basePrice + delta) * (it.quantity || 1);
    }, 0);
  }, [items]);

  const value = { items, addItem, removeItem, clear, subtotal };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
