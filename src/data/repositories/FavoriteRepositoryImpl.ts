import { LocalStorage } from "./../local/LocalStorage";
import { DataResult, FavoriteRepository, Product, Right } from "@/domain";
import { StorageTypes } from "../dto";

export class FavoriteRepositoryImpl implements FavoriteRepository {
  constructor(private readonly localStorage: LocalStorage) {}

  getAll() {
    return this.localStorage.getItem(StorageTypes.FAVORITE)
      ? this.localStorage.getItem(StorageTypes.FAVORITE)
      : [];
  }

  getFavorites(): DataResult<Product[]> {
    return Right(this.getAll());
  }
  addFavorite(product: Product): DataResult<Product[]> {
    const favorites = [...this.getAll(), product];
    this.localStorage.setItem(StorageTypes.FAVORITE, favorites);
    return Right(favorites);
  }
  removeFavorite(product: Product): DataResult<Product[]> {
    const filteredList = this.getAll().filter(
      (p: Product) => p.id !== product.id
    );
    this.localStorage.setItem(StorageTypes.FAVORITE, filteredList);
    return Right(filteredList);
  }
}
