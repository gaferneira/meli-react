import { Country, CountryRepository } from "@/domain";
import { LocalStorageTypes } from "../dto";
import { getLocalStorage, setLocalStorage } from "../utils";

export const CountryRepositoryImpl: CountryRepository = {
  getCurrentCountry: function (): Country {
    const code = getLocalStorage(LocalStorageTypes.COUNTRY);
    return Country.findByCode(code ?? "");
  },
  updateCurrentCountry: function (countryCode: string) {
    setLocalStorage(LocalStorageTypes.COUNTRY, countryCode);
    return Country.findByCode(countryCode);
  },
};
