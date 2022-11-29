import { Product } from "@/domain/entities";
import { configureStore } from "@reduxjs/toolkit";
import { Country } from "../entities/Country";
import { productsSlice, favoriteSlice } from "./slices";
import { countrySlice } from "./Slices/CountrySlice";
import { ProductsState } from "./slices/productsSlice";

export interface AppStore {
  products: ProductsState;
  favorites: Product[];
  country: Country;
}

const store = configureStore<AppStore>({
  reducer: {
    products: productsSlice.reducer,
    favorites: favoriteSlice.reducer,
    country: countrySlice.reducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
