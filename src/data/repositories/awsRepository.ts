import { Product } from './../../domain/entities/product';
import { ProductRepository } from "@/domain";
import { searchProducts } from "../remote";

export const AWSProductRepositoryImpl: ProductRepository = {
    getProducts: (query: string): Promise<Product[]> => {
        return searchProducts(query);
    },
    getProduct: (id: string): Promise<Product>  => {
        throw new Error('Function not implemented.');
    }
}