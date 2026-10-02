import { inject, injectable } from "inversify";
import type { DataResult, FavoriteRepository, Product } from "@/domain";
import { analyzeException, Left } from "@/domain";
import diService from "@/core/diService";

@injectable()
export class GetFavoritesUseCase {
  constructor(
    @inject(diService.FavoriteRepository)
    private repository: FavoriteRepository,
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
