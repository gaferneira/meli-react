import { Either, Left, Right } from "@/core/Either";
import { Failure, Product } from "../entities";
import { ProductRepository } from "../repositories";

export class GetProductsUseCase {
  private repository: ProductRepository;
  constructor(_repository: ProductRepository) {
    this.repository = _repository;
  }

  async invoke(
    country: string,
    query: string
  ): Promise<Either<Failure, Product[]>> {
    try {
      const data = await this.repository.getProducts(country, query);
      return Right(data);
    } catch (exception) {
      const failure = { message: "exception", code: "500" };
      return Left(failure);
    }
  }
}
