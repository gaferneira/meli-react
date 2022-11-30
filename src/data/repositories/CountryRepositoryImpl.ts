import { Country, CountryRepository, findCountryByCode } from "@/domain";
import { LocalStorageTypes } from "../dto";
import { getLocalStorage, setLocalStorage } from "../utils";

export const CountryRepositoryImpl: CountryRepository = {
  getCurrentCountry: function (): Country {
    const code = getLocalStorage(LocalStorageTypes.COUNTRY);
    return findCountryByCode(code ?? "");
  },
  updateCurrentCountry: function (countryCode: string) {
    setLocalStorage(LocalStorageTypes.COUNTRY, countryCode);
    return findCountryByCode(countryCode);
  },
};
