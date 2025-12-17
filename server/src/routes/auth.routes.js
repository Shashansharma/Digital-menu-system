import { Router } from 'express';
import { login, register, guest } from '../controllers/auth.controller.js';

const router = Router();
router.post('/register', register); // demo
router.post('/login', login);
router.post('/guest', guest);
export default router;
