//import { AWSProductRepositoryImpl } from "@/Data";
import { GetProductUseCase, GetProductsUseCase } from "@/Domain";
import { ProductRepositoryImpl } from "@/Data/Repositories";

//export const getProductsUseCase = new GetProductsUseCase(AWSProductRepositoryImpl)
export const getProductsUseCase = new GetProductsUseCase(ProductRepositoryImpl);
export const getProductUseCase = new GetProductUseCase(ProductRepositoryImpl);
