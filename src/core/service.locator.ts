import { AWSProductRepositoryImpl } from "@/data/repositories/awsRepository";
import { GetProductUseCase } from "@/domain/usecases/getProduct.usecase";
import { ProductRepositoryImpl } from "@/data/repositories";
import { GetProductsUseCase } from "@/domain/usecases";

//export const getProductsUseCase = new GetProductsUseCase(AWSProductRepositoryImpl)
export const getProductsUseCase = new GetProductsUseCase(ProductRepositoryImpl)
export const getProductUseCase = new GetProductUseCase(ProductRepositoryImpl)