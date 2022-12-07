import { DataResult, FavoriteRepository, Product, Right } from "@/domain";
import { StorageTypes } from "../dto";
import { getLocalStorage, setLocalStorage } from "../utils";

const getAll = function () {
  return getLocalStorage(StorageTypes.FAVORITE)
    ? getLocalStorage(StorageTypes.FAVORITE)
    : [];
};

export const FavoriteRepositoryImpl: FavoriteRepository = {
  getFavorites: function (): DataResult<Product[]> {
    return Right(getAll());
  },
  addFavorite: function (product: Product): DataResult<Product[]> {
    const favorites = [...getAll(), product];
    setLocalStorage(StorageTypes.FAVORITE, favorites);
    return Right(favorites);
  },
  removeFavorite: function (product: Product): DataResult<Product[]> {
    const filteredList = getAll().filter((p: Product) => p.id !== product.id);
    setLocalStorage(StorageTypes.FAVORITE, filteredList);
    return Right(filteredList);
  },
};
