import { GetLastSearchUseCase } from "./../domain/useCases/search/GetLastSearchUseCase";
import { CleanSearchUseCase } from "./../domain/useCases/search/CleanSearchUseCase";
import { AddLastSearchUseCase } from "./../domain/useCases/search/AddLastSearchUseCase";
import { GetFavoritesUseCase } from "../domain/useCases/products/GetFavoritesUseCase";
import { RemoveFavoriteUseCase } from "../domain/useCases/products/RemoveFavoriteUseCase";
import { AddFavoriteUseCase } from "../domain/useCases/products/AddFavoriteUseCase";
import {
  ProductRepositoryImpl,
  CountryRepositoryImpl,
  FavoriteRepositoryImpl,
  SearchRepositoryImpl,
  axiosInstance,
} from "@/data";
import {
  GetProductUseCase,
  GetProductsUseCase,
  ProductRepository,
  FavoriteRepository,
  CountryRepository,
  SearchRepository,
  GetCurrentCountryUseCase,
  UpdateCurrentCountryUseCase,
} from "@/domain";

export interface ServiceLocatorInterface {
  //repositories
  countryRepository: () => CountryRepository;
  favoriteRepository: () => FavoriteRepository;
  productRepository: () => ProductRepository;
  searchRepository: () => SearchRepository;
  //use cases
  getProductUseCase: () => GetProductUseCase;
  getProductsUseCase: () => GetProductsUseCase;
  getCurrentCountryUseCase: () => GetCurrentCountryUseCase;
  updateCurrentCountryUseCase: () => UpdateCurrentCountryUseCase;
  addFavoriteUseCase: () => AddFavoriteUseCase;
  removeFavoriteUseCase: () => RemoveFavoriteUseCase;
  getFavoritesUseCase: () => GetFavoritesUseCase;
  addLastSearchUseCase: () => AddLastSearchUseCase;
  cleanSearchUseCase: () => CleanSearchUseCase;
  getLastSearchUseCase: () => GetLastSearchUseCase;
}

let getProductUseCase: GetProductUseCase;
let getProductsUseCase: GetProductsUseCase;
let getCurrentCountryUseCase: GetCurrentCountryUseCase;
let updateCurrentCountryUseCase: UpdateCurrentCountryUseCase;
let addFavoriteUseCase: AddFavoriteUseCase;
let removeFavoriteUseCase: RemoveFavoriteUseCase;
let getFavoritesUseCase: GetFavoritesUseCase;

let addLastSearchUseCase: AddLastSearchUseCase;
let cleanSearchUseCase: CleanSearchUseCase;
let getLastSearchUseCase: GetLastSearchUseCase;

let countryRepository: CountryRepository;
let favoriteRepository: FavoriteRepository;
let productRepository: ProductRepository;
let searchRepository: SearchRepository;

const serviceLocatorImpl: ServiceLocatorInterface = {
  countryRepository: function (): CountryRepository {
    return countryRepository || (countryRepository = CountryRepositoryImpl);
  },
  favoriteRepository: function (): FavoriteRepository {
    return favoriteRepository || (favoriteRepository = FavoriteRepositoryImpl);
  },
  productRepository: function (): ProductRepository {
    return (
      productRepository ||
      (productRepository = new ProductRepositoryImpl(axiosInstance))
    );
  },
  searchRepository: function (): SearchRepository {
    return searchRepository || (searchRepository = SearchRepositoryImpl);
  },

  getProductUseCase: function (): GetProductUseCase {
    return (
      getProductUseCase ||
      (getProductUseCase = new GetProductUseCase(this.productRepository()))
    );
  },

  getProductsUseCase: function (): GetProductsUseCase {
    return (
      getProductsUseCase ||
      (getProductsUseCase = new GetProductsUseCase(this.productRepository()))
    );
  },

  getCurrentCountryUseCase: function (): GetCurrentCountryUseCase {
    return (
      getCurrentCountryUseCase ||
      (getCurrentCountryUseCase = new GetCurrentCountryUseCase(
        this.countryRepository()
      ))
    );
  },
  updateCurrentCountryUseCase: function (): UpdateCurrentCountryUseCase {
    return (
      updateCurrentCountryUseCase ||
      (updateCurrentCountryUseCase = new UpdateCurrentCountryUseCase(
        this.countryRepository()
      ))
    );
  },
  addFavoriteUseCase: function (): AddFavoriteUseCase {
    return (
      addFavoriteUseCase ||
      (addFavoriteUseCase = new AddFavoriteUseCase(this.favoriteRepository()))
    );
  },
  removeFavoriteUseCase: function (): RemoveFavoriteUseCase {
    return (
      removeFavoriteUseCase ||
      (removeFavoriteUseCase = new RemoveFavoriteUseCase(
        this.favoriteRepository()
      ))
    );
  },
  getFavoritesUseCase: function (): GetFavoritesUseCase {
    return (
      getFavoritesUseCase ||
      (getFavoritesUseCase = new GetFavoritesUseCase(this.favoriteRepository()))
    );
  },
  addLastSearchUseCase: function (): AddLastSearchUseCase {
    return (
      addLastSearchUseCase ||
      (addLastSearchUseCase = new AddLastSearchUseCase(this.searchRepository()))
    );
  },
  cleanSearchUseCase: function (): CleanSearchUseCase {
    return (
      cleanSearchUseCase ||
      (cleanSearchUseCase = new CleanSearchUseCase(this.searchRepository()))
    );
  },
  getLastSearchUseCase: function (): GetLastSearchUseCase {
    return (
      getLastSearchUseCase ||
      (getLastSearchUseCase = new GetLastSearchUseCase(this.searchRepository()))
    );
  },
};

let serviceLocator: ServiceLocatorInterface;
export const initServiceLocator = (locator: ServiceLocatorInterface) => {
  serviceLocator = locator;
};

export const getServiceLocator = () => {
  return serviceLocator || serviceLocatorImpl;
};
