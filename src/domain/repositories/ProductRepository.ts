import { Product } from "../entities";

export interface ProductRepository {
  getProducts(query: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product>;
}
