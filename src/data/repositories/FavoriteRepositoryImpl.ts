import { FavoriteRepository, Product } from "@/domain";
import { StorageTypes } from "../dto";
import { getLocalStorage, setLocalStorage } from "../utils";

export const FavoriteRepositoryImpl: FavoriteRepository = {
  getFavorites: function (): Product[] {
    return getLocalStorage(StorageTypes.FAVORITE)
      ? getLocalStorage(StorageTypes.FAVORITE)
      : [];
  },
  addFavorite: function (product: Product): Product[] {
    const favorites = [...this.getFavorites(), product];
    setLocalStorage(StorageTypes.FAVORITE, favorites);
    return favorites;
  },
  removeFavorite: function (product: Product): Product[] {
    const filteredList = this.getFavorites().filter(
      (p: Product) => p.id !== product.id
    );
    setLocalStorage(StorageTypes.FAVORITE, filteredList);
    return filteredList;
  },
};
