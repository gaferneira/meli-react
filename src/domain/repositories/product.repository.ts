import { Product } from '../entities/product';

export interface ProductRepository {
    getProducts(query: string): Promise<Product[]>;
    getProduct(id: string): Promise<Product>;
}