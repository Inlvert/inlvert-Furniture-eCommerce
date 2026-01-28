import { Product } from "../schema/product.schema";


export class PaginatedProductsDto {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
}