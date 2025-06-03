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

export interface Product{
  id?: string;
  name: string;
  price: number;
  inStock: boolean;
}

export const productsCollection = db.collection('products');
