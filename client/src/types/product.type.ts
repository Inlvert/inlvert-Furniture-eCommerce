// export interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   category: string;
//   images: string[];
// }

export type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  averageRating?: number;
  reviewsCount?: number;
  images?: string[];
};