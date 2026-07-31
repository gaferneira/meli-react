import type {
  DataResult,
  Product,
  ProductRepository} from "@/domain";
import {
  analyzeException,
  Left,
  Right,
} from "@/domain";
import type { AxiosInstance } from "axios";
import type { ApiResponseProducts, ProductDto} from "../dto";
import { ProductDtoToEntity } from "../dto";
import { getProductEndpoint, getSearchProductsEndpoint } from "../remote";
import { getCancelToken } from "../utils";

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async getProducts(
    country: string,
    query: string,
  ): Promise<DataResult<Product[]>> {
    const endpoint = getSearchProductsEndpoint(country, query);
    try {
      const response = await this.axiosInstance.get<ApiResponseProducts>(
        endpoint,
        {
          signal: getCancelToken("searchProduct"),
        },
      );
      const array: ProductDto[] = response.data.results;
      return Right(array.map((p) => ProductDtoToEntity(p)));
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }

  async getProduct(id: string): Promise<DataResult<Product>> {
    const endpoint = getProductEndpoint(id);
    try {
      const request = await this.axiosInstance.get<ProductDto>(endpoint);
      return Right(ProductDtoToEntity(request.data));
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
