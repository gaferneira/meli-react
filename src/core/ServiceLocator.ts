import { GetProductUseCase, GetProductsUseCase } from "@/domain";
import { ProductRepositoryImpl } from "@/data";

export const getProductsUseCase = new GetProductsUseCase(ProductRepositoryImpl);
export const getProductUseCase = new GetProductUseCase(ProductRepositoryImpl);
