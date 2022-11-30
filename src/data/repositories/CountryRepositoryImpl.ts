import { Country, CountryRepository } from "@/domain";
import { StorageTypes } from "../dto";
import { getLocalStorage, setLocalStorage } from "../utils";

export const CountryRepositoryImpl: CountryRepository = {
  getCurrentCountry: function (): Country {
    const code = getLocalStorage(StorageTypes.COUNTRY);
    return Country.findByCode(code ?? "");
  },
  updateCurrentCountry: function (countryCode: string) {
    setLocalStorage(StorageTypes.COUNTRY, countryCode);
    return Country.findByCode(countryCode);
  },
};
