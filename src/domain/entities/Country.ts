export class Country {
  private constructor(
    public readonly currency: string,
    public readonly id: string,
    public readonly code: string,
    public readonly name: string
  ) {}

  public static readonly NONE = new Country("", "", "", "");    
  public static readonly CUBA = new Country("CUP", "MCU", "CU", "Cuba");
  public static readonly ARGENTINA = new Country("ARS", "MLA", "AR", "Argentina");
  public static readonly VENEZUELA = new Country("VES", "MLV", "VE", "Venezuela");
  public static readonly MEXICO = new Country("MXN", "MLM", "MX", "Mexico");
  public static readonly DOMINICANA = new Country("DOP", "MRD", "DO", "Dominicana");
  public static readonly PARAGUAY = new Country("PYG", "MPY", "PY", "Paraguay");
  public static readonly HONDURAS = new Country("HNL", "MHN", "HN", "Honduras");
  public static readonly ECUADOR = new Country("USD", "MEC", "EC", "Ecuador");
  public static readonly URUGUAY = new Country("UYU", "MLU", "UY", "Uruguay");
  public static readonly PANAMA = new Country("PAB", "MPA", "PA", "Panamá");
  public static readonly NICARAGUA = new Country("NIO", "MNI", "NI", "Nicaragua");
  public static readonly COLOMBIA = new Country("COP", "MCO", "CO", "Colombia");
  public static readonly PERU = new Country("PEN", "MPE", "PE", "Perú");
  public static readonly BRASIL = new Country("BRL", "MLB", "BR", "Brasil");
  public static readonly BOLIVIA = new Country("BOB", "MBO", "BO", "Bolivia");
  public static readonly GUATEMALA = new Country("GTQ", "MGT", "GT", "Guatemala");
  public static readonly CHILE = new Country("CLP", "MLC", "CL", "Chile");
  public static readonly COSTA_RICA = new Country("CRC", "MCR", "CR", "Costa Rica");
  public static readonly EL_SALVADOR = new Country("USD", "MSV", "SV", "El Salvador");

  public static values = [
    Country.CUBA,
    Country.ARGENTINA,
    Country.VENEZUELA,
    Country.MEXICO,
    Country.DOMINICANA,
    Country.PARAGUAY,
    Country.HONDURAS,
    Country.ECUADOR,
    Country.URUGUAY,
    Country.PANAMA,
    Country.NICARAGUA,
    Country.COLOMBIA,
    Country.PERU,
    Country.BRASIL,
    Country.BOLIVIA,
    Country.GUATEMALA,
    Country.CHILE,
    Country.COSTA_RICA,
    Country.EL_SALVADOR,
  ];

  public static findByCode = (code?: String) => {
    return (
      Country.values.find(it => it.code === code?.toUpperCase()) ?? Country.NONE
    );
  };
}