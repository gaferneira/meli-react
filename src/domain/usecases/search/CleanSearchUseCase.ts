import { analyzeException, DataResult, Left } from "@/domain";
import { SearchRepository } from "@/domain/repositories/SearchRepository";

export class CleanSearchUseCase {
  private repository: SearchRepository;
  constructor(_repository: SearchRepository) {
    this.repository = _repository;
  }

  invoke(): DataResult<void> {
    try {
      return this.repository.cleanSearch();
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
