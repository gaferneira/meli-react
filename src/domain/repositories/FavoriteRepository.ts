import { Product } from "@/domain";
export interface FavoriteRepository {
  getFavorites(): Product[];
  addFavorite(product: Product): Product[];
  removeFavorite(product: Product): Product[];
}
