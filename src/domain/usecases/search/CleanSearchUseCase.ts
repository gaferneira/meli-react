import { inject, injectable } from "inversify";
import type { DataResult } from "@/domain";
import { analyzeException, Left } from "@/domain";
import type { SearchRepository } from "@/domain/repositories/SearchRepository";
import diService from "@/core/diService";

@injectable()
export class CleanSearchUseCase {
  constructor(
    @inject(diService.FavoriteRepository) private repository: SearchRepository,
  ) {}

  invoke(): DataResult<void> {
    try {
      return this.repository.cleanSearch();
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
