import { Router } from 'express';
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productsController';
import { validate } from 'src/middleware/validate';
import { validateIdParam } from 'src/middleware/validateId';
import { ProductSchema, ProductUpdateSchema } from 'src/models/Products';
// products
const product_router = Router();

product_router.post('/', validate(ProductSchema), createProduct);

product_router.get('/', listProducts);

product_router.get('/:id', validateIdParam, getProduct);

product_router.put('/:id', validateIdParam, validate(ProductUpdateSchema), updateProduct);

product_router.delete('/:id', validateIdParam, deleteProduct);

export default product_router;
