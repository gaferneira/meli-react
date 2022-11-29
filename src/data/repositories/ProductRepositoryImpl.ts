import { Product, ProductRepository } from "@/domain";
import { getProduct, searchProducts } from "../remote";

export const ProductRepositoryImpl: ProductRepository = {
  getProducts: (country: string, query: string): Promise<Product[]> => {
    return searchProducts(country, query);
  },
  getProduct: (id: string): Promise<Product> => {
    return getProduct(id);
  },
};
