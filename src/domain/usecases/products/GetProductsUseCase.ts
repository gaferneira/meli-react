import { analyzeException, Failure, Product } from "../../entities";
import { ProductRepository } from "../../repositories";
import { Either, Left } from "../../utils/Either";

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
      return await this.repository.getProducts(country, query);
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
