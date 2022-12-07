import { analyzeException, Failure, Product } from "../../entities";
import { ProductRepository } from "../../repositories";
import { Either, Left } from "../../utils/Either";

export class GetProductUseCase {
  private repository: ProductRepository;
  constructor(_repository: ProductRepository) {
    this.repository = _repository;
  }

  async invoke(id: string): Promise<Either<Failure, Product>> {
    try {
      return await this.repository.getProduct(id);
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
