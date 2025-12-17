import { User } from '../models/User.js';
import { signToken } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';
import { ROLES } from '../utils/roles.js';

// POST /api/auth/register (manager only in real apps; here exposed for demo)
export const register = async (req, res) => {
  try {
    const { name, email, password, role = ROLES.MANAGER } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });
    const user = await User.create({ name, email, password, role });
    const token = signToken({ id: user._id, role: user.role, name: user.name });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    res.status(500).json({ message: 'Register failed', error: e.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = signToken({ id: user._id, role: user.role, name: user.name });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    res.status(500).json({ message: 'Login failed', error: e.message });
  }
};

// POST /api/auth/guest - issue a customer token for a table session
export const guest = async (req, res) => {
  try {
    const { name = 'Guest', tableNumber } = req.body;
    if (!tableNumber) return res.status(400).json({ message: 'tableNumber required' });
    const token = signToken({ id: `guest-${Date.now()}`, role: ROLES.CUSTOMER, name, tableNumber });
    res.json({ token, user: { name, role: ROLES.CUSTOMER }, tableNumber });
  } catch (e) {
    res.status(500).json({ message: 'Guest auth failed', error: e.message });
  }
};
