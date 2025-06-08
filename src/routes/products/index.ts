import { Router } from 'express';
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productsController';
import { validate } from 'src/middleware/validate';
import { ProductSchema, ProductUpdateSchema } from 'src/models/Products';
// products
const product_router = Router();

product_router.post('/', validate(ProductSchema), createProduct);

product_router.get('/', listProducts);

product_router.get('/:id', getProduct);

product_router.put('/:id', validate(ProductUpdateSchema), updateProduct);

product_router.delete('/:id', deleteProduct);

export default product_router;
