import { analyzeException, DataResult, Left, Right } from "@/domain";
import { SearchRepository } from "@/domain/repositories/SearchRepository";

export class AddLastSearchUseCase {
  private repository: SearchRepository;
  constructor(_repository: SearchRepository) {
    this.repository = _repository;
  }

  invoke(search: string): DataResult<string> {
    try {
      return this.repository.addLastSearch(search);
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
