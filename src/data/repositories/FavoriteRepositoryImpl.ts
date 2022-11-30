import { FavoriteRepository, Product } from "@/domain";
import { LocalStorageTypes } from "../dto";
import { getLocalStorage, setLocalStorage } from "../utils";

export const FavoriteRepositoryImpl: FavoriteRepository = {
  getFavorites: function (): Product[] {
    return getLocalStorage(LocalStorageTypes.FAVORITE)
      ? getLocalStorage(LocalStorageTypes.FAVORITE)
      : [];
  },
  addFavorite: function (product: Product): Product[] {
    const favorites = [...this.getFavorites(), product];
    setLocalStorage(LocalStorageTypes.FAVORITE, favorites);
    return favorites;
  },
  removeFavorite: function (product: Product): Product[] {
    const filteredList = this.getFavorites().filter(
      (p: Product) => p.id !== product.id
    );
    setLocalStorage(LocalStorageTypes.FAVORITE, filteredList);
    return filteredList;
  },
};
