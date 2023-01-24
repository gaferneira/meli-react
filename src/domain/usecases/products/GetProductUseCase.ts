import { inject, injectable } from "inversify";
import { analyzeException, Failure, Product } from "../../entities";
import { ProductRepository } from "../../repositories";
import { Either, Left } from "../../utils/Either";
import diService from "@/core/diService";

@injectable()
export class GetProductUseCase {
  constructor(
    @inject(diService.FavoriteRepository) private repository: ProductRepository
  ) {}

  async invoke(id: string): Promise<Either<Failure, Product>> {
    try {
      return await this.repository.getProduct(id);
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
