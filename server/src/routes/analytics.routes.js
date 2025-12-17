import { Router } from 'express';
import { topItems, peakHours } from '../controllers/analytics.controller.js';
import { auth, requireRole, ROLES } from '../middleware/auth.js';

const router = Router();

router.get('/top-items', auth, requireRole(ROLES.MANAGER), topItems);
router.get('/peak-hours', auth, requireRole(ROLES.MANAGER), peakHours);

export default router;
