import {
  analyzeException,
  DataResult,
  FavoriteRepository,
  Left,
  Product,
  Right,
} from "@/domain";

export class AddFavoriteUseCase {
  private repository: FavoriteRepository;
  constructor(_repository: FavoriteRepository) {
    this.repository = _repository;
  }

  invoke(product: Product): DataResult<Product[]> {
    try {
      return this.repository.addFavorite(product);
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
