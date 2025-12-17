import { MenuItem } from '../models/MenuItem.js';

// GET /api/menus
export const listMenus = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const items = await MenuItem.find(filter).sort({ category: 1, name: 1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch menu', error: e.message });
  }
};

// POST /api/menus
export const createMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create item', error: e.message });
  }
};

// PUT /api/menus/:id
export const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update item', error: e.message });
  }
};

// DELETE /api/menus/:id
export const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(400).json({ message: 'Failed to delete item', error: e.message });
  }
};
