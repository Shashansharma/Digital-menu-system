import { Order } from '../models/Order.js';
import { MenuItem } from '../models/MenuItem.js';

const calcTotals = (items) => {
  const subtotal = items.reduce((sum, it) => sum + it.lineTotal, 0);
  const tax = Math.round(subtotal * 0.05 * 100) / 100; // 5% tax example
  const total = Math.round((subtotal + tax) * 100) / 100;
  return { subtotal, tax, total };
};

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { tableNumber, items } = req.body;
    if (!tableNumber || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: 'tableNumber and items required' });

    // Enrich and compute
    const finalItems = [];
    for (const it of items) {
      const menu = await MenuItem.findById(it.menuItem);
      if (!menu) return res.status(400).json({ message: 'Invalid menu item' });
      const base = menu.price;
      const customizations = (it.customizations || []).map((c) => ({ label: c.label, priceDelta: c.priceDelta || 0 }));
      const line = (base + customizations.reduce((s, c) => s + (c.priceDelta || 0), 0)) * (it.quantity || 1);
      finalItems.push({
        menuItem: menu._id,
        name: menu.name,
        price: base,
        quantity: it.quantity || 1,
        customizations,
        lineTotal: Math.round(line * 100) / 100,
      });
    }
    const totals = calcTotals(finalItems);
    const order = await Order.create({
      tableNumber,
      items: finalItems,
      ...totals,
      placedBy: req.user?.id || undefined,
    });
    // increment soldCount
    for (const it of finalItems) {
      await MenuItem.findByIdAndUpdate(it.menuItem, { $inc: { soldCount: it.quantity } });
    }
    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({ message: 'Failed to create order', error: e.message });
  }
};

// GET /api/orders/:id
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (e) {
    res.status(400).json({ message: 'Failed to fetch order', error: e.message });
  }
};

// GET /api/orders?tableNumber=12
export const listOrders = async (req, res) => {
  try {
    const { tableNumber, status } = req.query;
    const filter = {};
    if (tableNumber) filter.tableNumber = Number(tableNumber);
    if (status) filter.status = status;
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch orders', error: e.message });
  }
};

// PATCH /api/orders/:id/status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update status', error: e.message });
  }
};

// POST /api/orders/:id/split
export const splitBill = async (req, res) => {
  try {
    const { parts } = req.body; // integer
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    const share = Math.round((order.total / parts) * 100) / 100;
    res.json({ parts, share });
  } catch (e) {
    res.status(400).json({ message: 'Failed to split bill', error: e.message });
  }
};
