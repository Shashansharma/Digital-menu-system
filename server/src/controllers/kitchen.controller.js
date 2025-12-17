import { Order } from '../models/Order.js';

// GET /api/kitchen/queue
export const listQueue = async (req, res) => {
  try {
    const orders = await Order.find({ status: { $in: ['pending', 'in_kitchen'] } }).sort({ createdAt: 1 });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch queue', error: e.message });
  }
};

// PATCH /api/kitchen/:id/advance
export const advanceOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    const next = { pending: 'in_kitchen', in_kitchen: 'ready', ready: 'served' }[order.status] || order.status;
    order.status = next;
    await order.save();
    res.json(order);
  } catch (e) {
    res.status(400).json({ message: 'Failed to advance order', error: e.message });
  }
};
