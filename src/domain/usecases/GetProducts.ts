import { Either, Left, Right } from "@/Core";
import { Failure, Product, ProductRepository } from "@/Domain";

export class GetProductsUseCase {
  private repository: ProductRepository;
  constructor(_repository: ProductRepository) {
    this.repository = _repository;
  }

  async invoke(query: string): Promise<Either<Failure, Product[]>> {
    try {
      const data = await this.repository.getProducts(query);
      return Right(data);
    } catch (exception) {
      const failure = { message: "exception", code: "500" };
      return Left(failure);
    }
  }
}
