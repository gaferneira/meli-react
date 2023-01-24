import { inject, injectable } from "inversify";
import { analyzeException, Failure, Product } from "../../entities";
import { ProductRepository } from "../../repositories";
import { Either, Left } from "../../utils/Either";
import diService from "@/core/diService";

@injectable()
export class GetProductsUseCase {
  constructor(
    @inject(diService.ProductRepository) private repository: ProductRepository
  ) {}

  async invoke(
    country: string,
    query: string
  ): Promise<Either<Failure, Product[]>> {
    try {
      return await this.repository.getProducts(country, query);
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
