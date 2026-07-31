import { inject, injectable } from "inversify";
import type { Failure, Product } from "../../entities";
import { analyzeException } from "../../entities";
import type { ProductRepository } from "../../repositories";
import type { Either } from "../../utils/Either";
import { Left } from "../../utils/Either";
import diService from "@/core/diService";

@injectable()
export class GetProductsUseCase {
  constructor(
    @inject(diService.ProductRepository) private repository: ProductRepository,
  ) {}

  async invoke(
    country: string,
    query: string,
  ): Promise<Either<Failure, Product[]>> {
    try {
      return await this.repository.getProducts(country, query);
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
