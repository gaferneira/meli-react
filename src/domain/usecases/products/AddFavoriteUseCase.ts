import { inject, injectable } from "inversify";
import type {
  DataResult,
  FavoriteRepository,
  Product} from "@/domain";
import {
  analyzeException,
  Left
} from "@/domain";
import diService from "@/core/diService";

@injectable()
export class AddFavoriteUseCase {
  constructor(
    @inject(diService.FavoriteRepository)
    private repository: FavoriteRepository,
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
