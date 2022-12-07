import { Country, DataResult } from "@/domain";
export interface CountryRepository {
  getCurrentCountry(): DataResult<Country>;
  updateCurrentCountry(countryCode: string): DataResult<Country>;
}
