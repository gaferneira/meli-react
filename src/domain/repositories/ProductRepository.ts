import { DataResult, Product } from "@/domain";
export interface ProductRepository {
  getProducts(country: string, query: string): Promise<DataResult<Product[]>>;
  getProduct(id: string): Promise<DataResult<Product>>;
}
