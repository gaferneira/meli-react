import { Product } from "./../../domain/entities/product";
import { ProductRepository } from "@/domain";
import { searchProducts } from "../remote";

export const ProductRepositoryImpl: ProductRepository = {
  getProducts: (country: string, query: string): Promise<Product[]> => {
    return searchProducts(country, query);
  },
  getProduct: (id: string): Promise<Product> => {
    throw new Error("Function not implemented.");
  },
};
