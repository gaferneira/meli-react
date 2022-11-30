import {
  ProductRepositoryImpl,
  CountryRepositoryImpl,
  FavoriteRepositoryImpl,
} from "@/data";
import {
  GetProductUseCase,
  GetProductsUseCase,
  ProductRepository,
  FavoriteRepository,
  CountryRepository,
} from "@/domain";

export interface ServiceLocatorInterface {
  //repositories
  countryRepository: () => CountryRepository;
  favoriteRepository: () => FavoriteRepository;
  productRepository: () => ProductRepository;
  //use cases
  getProductUseCase: () => GetProductUseCase;
  getProductsUseCase: () => GetProductsUseCase;
}

let getProductUseCase: GetProductUseCase;
let getProductsUseCase: GetProductsUseCase;
let countryRepository: CountryRepository;
let favoriteRepository: FavoriteRepository;
let productRepository: ProductRepository;

export const serviceLocator: ServiceLocatorInterface = {
  countryRepository: function (): CountryRepository {
    return countryRepository || (countryRepository = CountryRepositoryImpl);
  },
  favoriteRepository: function (): FavoriteRepository {
    return favoriteRepository || (favoriteRepository = FavoriteRepositoryImpl);
  },
  productRepository: function (): ProductRepository {
    return productRepository || (productRepository = ProductRepositoryImpl);
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
