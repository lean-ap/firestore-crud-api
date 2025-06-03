import { Router } from "express";
import { 
    listProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct 
} from "./productsController";
// products
const product_router= Router();

product_router.post('/',createProduct);

product_router.get('/', listProducts);

product_router.get('/:id', getProduct);

product_router.put('/:id',updateProduct)

product_router.delete('/:id',deleteProduct)


export default product_router;