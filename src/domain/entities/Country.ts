export interface Country {
  currency: string;
  id: string;
  code: string;
  name: string;
}

function newCountry(
  currency: string,
  id: string,
  code: string,
  name: string
): Country {
  return { currency, id, code, name };
}

const NONE = newCountry("", "", "", "");
const CUBA = newCountry("CUP", "MCU", "CU", "Cuba");
const ARGENTINA = newCountry("ARS", "MLA", "AR", "Argentina");
const VENEZUELA = newCountry("VES", "MLV", "VE", "Venezuela");
const MEXICO = newCountry("MXN", "MLM", "MX", "Mexico");
const DOMINICANA = newCountry("DOP", "MRD", "DO", "Dominicana");
const PARAGUAY = newCountry("PYG", "MPY", "PY", "Paraguay");
const HONDURAS = newCountry("HNL", "MHN", "HN", "Honduras");
const ECUADOR = newCountry("USD", "MEC", "EC", "Ecuador");
const URUGUAY = newCountry("UYU", "MLU", "UY", "Uruguay");
const PANAMA = newCountry("PAB", "MPA", "PA", "Panamá");
const NICARAGUA = newCountry("NIO", "MNI", "NI", "Nicaragua");
const COLOMBIA = newCountry("COP", "MCO", "CO", "Colombia");
const PERU = newCountry("PEN", "MPE", "PE", "Perú");
const BRASIL = newCountry("BRL", "MLB", "BR", "Brasil");
const BOLIVIA = newCountry("BOB", "MBO", "BO", "Bolivia");
const GUATEMALA = newCountry("GTQ", "MGT", "GT", "Guatemala");
const CHILE = newCountry("CLP", "MLC", "CL", "Chile");
const COSTA_RICA = newCountry("CRC", "MCR", "CR", "Costa Rica");
const EL_SALVADOR = newCountry("USD", "MSV", "SV", "El Salvador");

export const countryValues = [
  CUBA,
  ARGENTINA,
  VENEZUELA,
  MEXICO,
  DOMINICANA,
  PARAGUAY,
  HONDURAS,
  ECUADOR,
  URUGUAY,
  PANAMA,
  NICARAGUA,
  COLOMBIA,
  PERU,
  BRASIL,
  BOLIVIA,
  GUATEMALA,
  CHILE,
  COSTA_RICA,
  EL_SALVADOR,
];

export const findCountryByCode = (code?: string) => {
  return countryValues.find((it) => it.code === code?.toUpperCase()) ?? NONE;
};
