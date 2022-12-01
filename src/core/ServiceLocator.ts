import {
  ProductRepositoryImpl,
  CountryRepositoryImpl,
  FavoriteRepositoryImpl,
  SearchRepositoryImpl,
} from "@/data";
import {
  GetProductUseCase,
  GetProductsUseCase,
  ProductRepository,
  FavoriteRepository,
  CountryRepository,
  SearchRepository,
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
}

let getProductUseCase: GetProductUseCase;
let getProductsUseCase: GetProductsUseCase;
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
    return productRepository || (productRepository = ProductRepositoryImpl);
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
};

let serviceLocator: ServiceLocatorInterface;
export const initServiceLocator = (locator: ServiceLocatorInterface) => {
  serviceLocator = locator;
};

export const getServiceLocator = () => {
  return serviceLocator || serviceLocatorImpl;
};
