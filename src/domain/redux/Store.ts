import { Product } from "@/domain/entities";
import { configureStore } from "@reduxjs/toolkit";
import { productsSlice, favoriteSlice } from "./slices";
import { ProductsState } from "./slices/productsSlice";

export interface AppStore {
  products: ProductsState;
  favorites: Product[];
}

const store = configureStore<AppStore>({
  reducer: {
    products: productsSlice.reducer,
    favorites: favoriteSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
