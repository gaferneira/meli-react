import { inject, injectable } from "inversify";
import { analyzeException, DataResult, Left } from "@/domain";
import { SearchRepository } from "@/domain/repositories/SearchRepository";
import diService from "@/core/diService";

@injectable()
export class AddLastSearchUseCase {
  constructor(
    @inject(diService.FavoriteRepository) private repository: SearchRepository
  ) {}

  invoke(search: string): DataResult<string> {
    try {
      return this.repository.addLastSearch(search);
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
