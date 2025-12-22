import { Router } from 'express';
import * as productController from '../controllers/productController';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { CreateProductDto } from '../validation/productValidation';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductDetail);

router.post(
  '/', 
  validationMiddleware(CreateProductDto),
  productController.createProduct
);

router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;