import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();


router.get('/', categoryController.getCategories);


router.post('/', authenticateToken, categoryController.createCategory);
router.put('/:id', authenticateToken, categoryController.updateCategory);
router.delete('/:id', authenticateToken, categoryController.deleteCategory);

export default router;