import { Router } from 'express';
import { listMenus, createMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menu.controller.js';
import { auth, requireRole, ROLES } from '../middleware/auth.js';

const router = Router();

router.get('/', listMenus);
router.post('/', auth, requireRole(ROLES.MANAGER), createMenuItem);
router.put('/:id', auth, requireRole(ROLES.MANAGER), updateMenuItem);
router.delete('/:id', auth, requireRole(ROLES.MANAGER), deleteMenuItem);

export default router;
