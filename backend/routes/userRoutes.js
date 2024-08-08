import { Router } from 'express';
import { register, login, transfer } from '../controllers.userController';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/transfer', transfer);

export default router;