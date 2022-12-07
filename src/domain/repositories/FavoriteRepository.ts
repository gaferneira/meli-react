import { DataResult, Product } from "@/domain";
export interface FavoriteRepository {
  getFavorites(): DataResult<Product[]>;
  addFavorite(product: Product): DataResult<Product[]>;
  removeFavorite(product: Product): DataResult<Product[]>;
}
