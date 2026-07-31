import type { Country, CountryRepository, DataResult } from "@/domain";
import { findCountryByCode, Right } from "@/domain";
import { StorageTypes } from "../dto";
import type { LocalStorage } from "../local";

export class CountryRepositoryImpl implements CountryRepository {
  constructor(private readonly localStorage: LocalStorage) {}
  getCurrentCountry(): DataResult<Country> {
    const code = this.localStorage.getItem(StorageTypes.COUNTRY);
    return Right(findCountryByCode(code ?? ""));
  }
  updateCurrentCountry(countryCode: string): DataResult<Country> {
    this.localStorage.setItem(StorageTypes.COUNTRY, countryCode);
    return Right(findCountryByCode(countryCode));
  }
}
