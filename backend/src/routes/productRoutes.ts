import { Router } from 'express';
import * as productController from '../controllers/productController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { CreateProductDto } from '../validation/productValidation';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductDetail);

router.post(
  '/', 
  authenticateToken
  ,
  validationMiddleware(CreateProductDto),
  productController.createProduct
);

router.put('/:id', authenticateToken, productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

export default router;