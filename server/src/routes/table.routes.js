import { Router } from 'express';
import { listTables, createTable, updateTable, deleteTable } from '../controllers/table.controller.js';
import { auth, requireRole, ROLES } from '../middleware/auth.js';

const router = Router();

router.get('/', auth, requireRole(ROLES.WAITER, ROLES.MANAGER), listTables);
router.post('/', auth, requireRole(ROLES.MANAGER), createTable);
router.patch('/:id', auth, requireRole(ROLES.MANAGER), updateTable);
router.delete('/:id', auth, requireRole(ROLES.MANAGER), deleteTable);

export default router;
