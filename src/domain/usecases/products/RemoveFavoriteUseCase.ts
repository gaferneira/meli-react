import {
  analyzeException,
  DataResult,
  FavoriteRepository,
  Left,
  Product,
  Right,
} from "@/domain";

export class RemoveFavoriteUseCase {
  private repository: FavoriteRepository;
  constructor(_repository: FavoriteRepository) {
    this.repository = _repository;
  }

  invoke(product: Product): DataResult<Product[]> {
    try {
      return this.repository.removeFavorite(product);
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
