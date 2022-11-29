import { Product, ProductRepository } from "@/domain";
import { getProduct, searchProducts } from "../remote";

export const ProductRepositoryImpl: ProductRepository = {
  getProducts: (query: string): Promise<Product[]> => {
    return searchProducts(query);
  },
  getProduct: (id: string): Promise<Product> => {
    return getProduct(id);
  },
};
