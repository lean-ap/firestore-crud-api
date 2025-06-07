// import Products from "src/models/Products";
// import { getRepository } from "fireorm";
import { Product, productsCollection } from 'src/models/Products';
import { asyncHandler } from 'src/utils/asyncHandler';

// const productRepository = getRepository(Products);

// export function createProduct(req:Request,res:Response){
//     console.log(req.body)
//     res.send(`New product created ${req.body}`);

// }
export const createProduct = asyncHandler(async (req, res) => {
  const newProduct: Product = req.body;
  const docRef = await productsCollection.add(newProduct);
  res.status(201).json({ id: docRef.id, ...newProduct });
});
// export const createProduct = async (req:Request, res:Response) =>{

//     try{
//         const product = await productRepository.create(req.body);
//         res.status(201).json(product);

//     } catch (err){
//         res.status(400).json({error: (err as Error).message})
//     }

// }

// List All Products
export const listProducts = asyncHandler(async (_req, res) => {
  const snapshot = await productsCollection.get();
  const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.status(200).json(products);
});
// export function listProducts(req:Request,res:Response){
//     res.send('List of products');
// }

// Read Single Product by ID
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doc = await productsCollection.doc(id).get();

  if (!doc.exists) return res.status(404).json({ error: 'Product not found' });
  res.json({ id: doc.id, ...doc.data() });
});
// export function getProductsById(req:Request,res:Response){
//     console.log(req.params.id);
//     res.send(`product with some id: ${req.params.id}`);
// }

// Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const docRef = productsCollection.doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return res.status(404).json({ message: 'Produc not found' });
  }

  await docRef.update(updates);
  const updatedDoc = await docRef.get();

  res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
});

// export function updateProduct(req:Request,res:Response){
//     res.send(`product updated id: ${req.params.id}`);

// }
// Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const docRef = productsCollection.doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return res.status(404).json({ message: 'PRoduct not found' });
  }

  await docRef.delete();
  res.status(204).send();
});
// export function deleteProduct(req:Request,res:Response){
//     res.send(`product deleted id: ${req.params.id}`);

// };
