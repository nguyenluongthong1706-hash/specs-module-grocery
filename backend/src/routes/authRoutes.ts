import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { RegisterDto } from '../validation/authValidation';

const router = Router();

// Gắn luật kiểm tra đăng ký
router.post('/register', validationMiddleware(RegisterDto), authController.register);

router.post('/login', authController.login);

export default router;