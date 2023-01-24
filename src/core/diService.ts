import "reflect-metadata";

const diService = {
  //repositories
  CountryRepository: Symbol("CountryRepository"),
  FavoriteRepository: Symbol("FavoriteRepository"),
  ProductRepository: Symbol("ProductRepository"),
  SearchRepository: Symbol("SearchRepository"),
  //use cases
  GetCurrentCountryUseCase: Symbol("GetCurrentCountryUseCase"),
  UpdateCurrentCountryUseCase: Symbol("UpdateCurrentCountryUseCase"),
  AddFavoriteUseCase: Symbol("AddFavoriteUseCase"),
  GetFavoritesUseCase: Symbol("GetFavoritesUseCase"),
  GetProductsUseCase: Symbol("GetProductsUseCase"),
  RemoveFavoriteUseCase: Symbol("RemoveFavoriteUseCase"),
  AddLastSearchUseCase: Symbol("AddLastSearchUseCase"),
  CleanSearchUseCase: Symbol("CleanSearchUseCase"),
  GetLastSearchUseCase: Symbol("GetLastSearchUseCase"),
};

export default diService;
