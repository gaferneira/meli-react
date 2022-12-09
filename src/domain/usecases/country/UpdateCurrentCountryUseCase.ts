import {
  analyzeException,
  Country,
  CountryRepository,
  DataResult,
  Left,
} from "@/domain";

export class UpdateCurrentCountryUseCase {
  private repository: CountryRepository;
  constructor(_repository: CountryRepository) {
    this.repository = _repository;
  }

  invoke(countryCode: string): DataResult<Country> {
    try {
      return this.repository.updateCurrentCountry(countryCode);
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
