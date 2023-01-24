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
export class GetFavoritesUseCase {
  constructor(
    @inject(diService.FavoriteRepository) private repository: FavoriteRepository
  ) {}

  invoke(): DataResult<Product[]> {
    try {
      return this.repository.getFavorites();
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
