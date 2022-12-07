import {
  Country,
  CountryRepository,
  DataResult,
  findCountryByCode,
  Right,
} from "@/domain";
import { StorageTypes } from "../dto";
import { getLocalStorage, setLocalStorage } from "../utils";

export const CountryRepositoryImpl: CountryRepository = {
  getCurrentCountry: function (): DataResult<Country> {
    const code = getLocalStorage(StorageTypes.COUNTRY);
    return Right(findCountryByCode(code ?? ""));
  },
  updateCurrentCountry: function (countryCode: string) {
    setLocalStorage(StorageTypes.COUNTRY, countryCode);
    return Right(findCountryByCode(countryCode));
  },
};
