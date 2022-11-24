import { Product, ProductRepository } from "@/Domain";
import { searchProducts, getProduct } from "@/Data";

export const ProductRepositoryImpl: ProductRepository = {
  getProducts: (query: string): Promise<Product[]> => {
    return searchProducts(query);
  },
  getProduct: (id: string): Promise<Product> => {
    return getProduct(id);
  },
};
