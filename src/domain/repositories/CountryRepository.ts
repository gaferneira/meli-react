import { Country } from "@/domain";
export interface CountryRepository {
  getCurrentCountry(): Country;
  updateCurrentCountry(countryCode: string): Country;
}
