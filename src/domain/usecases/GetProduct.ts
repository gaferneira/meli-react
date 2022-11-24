import { Either, Left, Right } from "@/Core";
import { Failure, Product, ProductRepository } from "@/Domain";

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
      const Failure = { message: "exception", code: "500" };
      return Left(Failure);
    }
  }
}
