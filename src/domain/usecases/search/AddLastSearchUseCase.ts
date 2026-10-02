import { inject, injectable } from "inversify";
import type { DataResult } from "@/domain";
import { analyzeException, Left } from "@/domain";
import type { SearchRepository } from "@/domain/repositories/SearchRepository";
import diService from "@/core/diService";

@injectable()
export class AddLastSearchUseCase {
  constructor(
    @inject(diService.SearchRepository) private repository: SearchRepository,
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
