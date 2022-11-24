import { ProductRepository, Product } from "@/Domain";
import { searchProducts } from "@/Data";

export const AWSProductRepositoryImpl: ProductRepository = {
  getProducts: (query: string): Promise<Product[]> => {
    return searchProducts(query);
  },
  getProduct: (id: string): Promise<Product> => {
    throw new Error("Function not implemented.");
  },
};
