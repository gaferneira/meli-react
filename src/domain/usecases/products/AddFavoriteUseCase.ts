import { inject, injectable } from "inversify";
import {
  analyzeException,
  DataResult,
  FavoriteRepository,
  Left,
  Product,
} from "@/domain";
import diService from "@/core/diService";

@injectable()
export class AddFavoriteUseCase {
  constructor(
    @inject(diService.FavoriteRepository) private repository: FavoriteRepository
  ) {}

  invoke(product: Product): DataResult<Product[]> {
    try {
      return this.repository.addFavorite(product);
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
