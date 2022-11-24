import { Either, Left, Right } from "@/core/Either";
import { Failure, Product } from "../entities";
import { ProductRepository } from "../repositories";

export class GetProductUseCase {
  private repository: ProductRepository;
  constructor(_repository: ProductRepository) {
    this.repository = _repository;
  }

  async invoke(id: string): Promise<Either<Failure, Product>> {
    try {
      const data = await this.repository.getProduct(id);
      return Right(data);
    } catch (exception) {
      const failure = { message: "exception", code: "500" };
      return Left(failure);
    }
  }
}
