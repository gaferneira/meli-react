import {
  analyzeException,
  DataResult,
  FavoriteRepository,
  Left,
  Product,
} from "@/domain";

export class GetFavoritesUseCase {
  private repository: FavoriteRepository;
  constructor(_repository: FavoriteRepository) {
    this.repository = _repository;
  }

  invoke(): DataResult<Product[]> {
    try {
      return this.repository.getFavorites();
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
