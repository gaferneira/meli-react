import {
  analyzeException,
  Country,
  CountryRepository,
  DataResult,
  Left,
  Right,
} from "@/domain";

export class GetCurrentCountryUseCase {
  private repository: CountryRepository;
  constructor(_repository: CountryRepository) {
    this.repository = _repository;
  }

  invoke(): DataResult<Country> {
    try {
      return this.repository.getCurrentCountry();
    } catch (exception) {
      const failure = analyzeException(exception);
      return Left(failure);
    }
  }
}
