import { analyzeException, DataResult, Left, Right } from "@/domain";
import { SearchRepository } from "@/domain/repositories/SearchRepository";

export class GetLastSearchUseCase {
  private repository: SearchRepository;
  constructor(_repository: SearchRepository) {
    this.repository = _repository;
  }

  invoke(): DataResult<string> {
    try {
      return this.repository.getLastSearch();
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
