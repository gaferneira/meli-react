import { Product } from "@/Domain";

export interface ProductRepository {
  getProducts(query: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product>;
}
