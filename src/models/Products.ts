// import { Collection } from 'fireorm';

// @Collection('products')
// class Products {
// //   @Id()
//   id!: string;
//   name!: string;
//   price!: number;
//   currency!: string;
// }

// export default Products;

import db from '../db';
import { z } from 'zod';

export interface Product {
  id?: string;
  name: string;
  price: number;
  inStock: boolean;
}

export const ProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().nonnegative('Product price must be non-negavtive'),
  inStock: z.boolean(),
});

export const ProductUpdateSchema = ProductSchema.partial();

export const productsCollection = db.collection('products');
