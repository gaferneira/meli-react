import { inject, injectable } from "inversify";
import { analyzeException, DataResult, Left } from "@/domain";
import { SearchRepository } from "@/domain/repositories/SearchRepository";
import diService from "@/core/diService";

@injectable()
export class GetLastSearchUseCase {
  constructor(
    @inject(diService.FavoriteRepository) private repository: SearchRepository
  ) {}

  invoke(): DataResult<string> {
    try {
      return this.repository.getLastSearch();
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
