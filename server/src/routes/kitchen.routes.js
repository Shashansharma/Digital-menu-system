import { Router } from 'express';
import { listQueue, advanceOrder } from '../controllers/kitchen.controller.js';
import { auth, requireRole, ROLES } from '../middleware/auth.js';

const router = Router();

router.get('/queue', auth, requireRole(ROLES.WAITER, ROLES.MANAGER), listQueue);
router.patch('/:id/advance', auth, requireRole(ROLES.WAITER, ROLES.MANAGER), advanceOrder);

export default router;
