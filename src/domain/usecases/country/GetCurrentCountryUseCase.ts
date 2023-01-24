import { inject, injectable } from "inversify";
import {
  analyzeException,
  Country,
  CountryRepository,
  DataResult,
  Left,
} from "@/domain";
import diService from "@/core/diService";

@injectable()
export class GetCurrentCountryUseCase {
  constructor(
    @inject(diService.CountryRepository) private repository: CountryRepository
  ) {}

  invoke(): DataResult<Country> {
    try {
      return this.repository.getCurrentCountry();
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
