import { Product, Country } from "@/domain/entities";
import { configureStore } from "@reduxjs/toolkit";
import {
  productsSlice,
  favoriteSlice,
  countrySlice,
  ProductsState,
  searchSlice,
} from "./slices";
export interface AppStore {
  products: ProductsState;
  favorites: Product[];
  country: Country;
  search: string;
}

const store = configureStore<AppStore>({
  reducer: {
    products: productsSlice.reducer,
    favorites: favoriteSlice.reducer,
    country: countrySlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
