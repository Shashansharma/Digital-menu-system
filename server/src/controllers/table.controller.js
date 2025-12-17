import { Table } from '../models/Table.js';

// GET /api/tables
export const listTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ number: 1 });
    res.json(tables);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch tables', error: e.message });
  }
};

// POST /api/tables
export const createTable = async (req, res) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json(table);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create table', error: e.message });
  }
};

// PATCH /api/tables/:id
export const updateTable = async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!table) return res.status(404).json({ message: 'Table not found' });
    res.json(table);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update table', error: e.message });
  }
};

// DELETE /api/tables/:id
export const deleteTable = async (req, res) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);
    if (!table) return res.status(404).json({ message: 'Table not found' });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(400).json({ message: 'Failed to delete table', error: e.message });
  }
};
