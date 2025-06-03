import { Request, Response } from "express";
// import Products from "src/models/Products";
// import { getRepository } from "fireorm";
import { Product, productsCollection } from "src/models/Products";


// const productRepository = getRepository(Products);


// export function createProduct(req:Request,res:Response){
//     console.log(req.body)
//     res.send(`New product created ${req.body}`);

// }
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = req.body;
    const docRef = await productsCollection.add(newProduct);
    res.status(201).json({ id: docRef.id, ...newProduct });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};
// export const createProduct = async (req:Request, res:Response) =>{

//     try{
//         const product = await productRepository.create(req.body);
//         res.status(201).json(product);

//     } catch (err){
//         res.status(400).json({error: (err as Error).message})
//     }

// } 

// List All Products
export const listProducts = async (_req: Request, res: Response) => {
  try {
    const snapshot = await productsCollection.get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
// export function listProducts(req:Request,res:Response){
//     res.send('List of products');
// }

// Read Single Product by ID
export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const doc = await productsCollection.doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Product not found' });
    res.json({ id: doc.id, ...doc.data() });
  } catch {
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
};
// export function getProductsById(req:Request,res:Response){
//     console.log(req.params.id);
//     res.send(`product with some id: ${req.params.id}`);
// }

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    await productsCollection.doc(id).update(updates);
    res.json({ id, ...updates });
  } catch {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// export function updateProduct(req:Request,res:Response){
//     res.send(`product updated id: ${req.params.id}`);

// }
// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await productsCollection.doc(id).delete();
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
// export function deleteProduct(req:Request,res:Response){
//     res.send(`product deleted id: ${req.params.id}`);

// };