import { inject, injectable } from "inversify";
import type { Country, CountryRepository, DataResult } from "@/domain";
import { analyzeException, Left } from "@/domain";
import diService from "@/core/diService";

@injectable()
export class UpdateCurrentCountryUseCase {
  constructor(
    @inject(diService.CountryRepository) private repository: CountryRepository,
  ) {}

  invoke(countryCode: string): DataResult<Country> {
    try {
      return this.repository.updateCurrentCountry(countryCode);
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
