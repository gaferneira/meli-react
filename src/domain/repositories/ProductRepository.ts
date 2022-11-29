import { Product } from "../entities/Product";

export interface ProductRepository {
  getProducts(country: string, query: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product>;
}
