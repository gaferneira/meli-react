import { Container } from "inversify";
import {
  CountryRepository,
  FavoriteRepository,
  ProductRepository,
  SearchRepository,
  GetCurrentCountryUseCase,
  UpdateCurrentCountryUseCase,
  AddFavoriteUseCase,
  GetFavoritesUseCase,
  GetProductsUseCase,
  RemoveFavoriteUseCase,
  AddLastSearchUseCase,
  CleanSearchUseCase,
  GetLastSearchUseCase,
} from "../domain";
import {
  axiosInstance,
  CountryRepositoryImpl,
  FavoriteRepositoryImpl,
  LocalStorage,
  ProductRepositoryImpl,
  SearchRepositoryImpl,
} from "../data";
import diService from "./diService";

const configRepositories = (container: Container) => {
  container
    .bind<CountryRepository>(diService.CountryRepository)
    .toConstantValue(new CountryRepositoryImpl(new LocalStorage(localStorage)));
  container
    .bind<FavoriteRepository>(diService.FavoriteRepository)
    .toConstantValue(
      new FavoriteRepositoryImpl(new LocalStorage(localStorage))
    );
  container
    .bind<ProductRepository>(diService.ProductRepository)
    .toConstantValue(new ProductRepositoryImpl(axiosInstance));
  container
    .bind<SearchRepository>(diService.SearchRepository)
    .toConstantValue(
      new SearchRepositoryImpl(new LocalStorage(sessionStorage))
    );
};

const configUseCases = (container: Container) => {
  container
    .bind<GetCurrentCountryUseCase>(diService.GetCurrentCountryUseCase)
    .to(GetCurrentCountryUseCase);
  container
    .bind<UpdateCurrentCountryUseCase>(diService.UpdateCurrentCountryUseCase)
    .to(UpdateCurrentCountryUseCase);
  container
    .bind<AddFavoriteUseCase>(diService.AddFavoriteUseCase)
    .to(AddFavoriteUseCase);
  container
    .bind<GetFavoritesUseCase>(diService.GetFavoritesUseCase)
    .to(GetFavoritesUseCase);
  container
    .bind<GetProductsUseCase>(diService.GetProductsUseCase)
    .to(GetProductsUseCase);
  container
    .bind<RemoveFavoriteUseCase>(diService.RemoveFavoriteUseCase)
    .to(RemoveFavoriteUseCase);
  container
    .bind<AddLastSearchUseCase>(diService.AddLastSearchUseCase)
    .to(AddLastSearchUseCase);
  container
    .bind<CleanSearchUseCase>(diService.CleanSearchUseCase)
    .to(CleanSearchUseCase);
  container
    .bind<GetLastSearchUseCase>(diService.GetLastSearchUseCase)
    .to(GetLastSearchUseCase);
};

const diContainer = new Container();
configRepositories(diContainer);
configUseCases(diContainer);
export { diContainer };
