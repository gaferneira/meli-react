import { Product, Country } from "@/domain/entities";
import { configureStore } from "@reduxjs/toolkit";
import { favoriteSlice, countrySlice, searchSlice } from "./slices";
export interface AppStore {
  favorites: Product[];
  country: Country;
  search: string;
}

const store = configureStore<AppStore>({
  reducer: {
    favorites: favoriteSlice.reducer,
    country: countrySlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
