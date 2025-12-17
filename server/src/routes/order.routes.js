import { Router } from 'express';
import { createOrder, getOrder, listOrders, updateStatus, splitBill } from '../controllers/order.controller.js';
import { auth, optionalAuth, requireRole, ROLES } from '../middleware/auth.js';

const router = Router();

router.get('/', listOrders);
router.get('/:id', getOrder);
router.post('/', optionalAuth, createOrder); // Allow both authenticated and guest users
router.patch('/:id/status', auth, requireRole(ROLES.WAITER, ROLES.MANAGER), updateStatus);
router.post('/:id/split', splitBill);

export default router;
