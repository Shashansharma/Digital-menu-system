import { Order } from '../models/Order.js';
import { MenuItem } from '../models/MenuItem.js';

// GET /api/analytics/top-items
export const topItems = async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ soldCount: -1 }).limit(10);
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: e.message });
  }
};

// GET /api/analytics/peak-hours
export const peakHours = async (req, res) => {
  try {
    const pipeline = [
      { $group: { _id: { $hour: '$createdAt' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ];
    const data = await Order.aggregate(pipeline);
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch peak hours', error: e.message });
  }
};
