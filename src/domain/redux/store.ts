import { Cart, Product } from "@/domain/entities";
import { configureStore } from "@reduxjs/toolkit";
import { productsSlice, favoriteSlice, cartSlice } from "./slices";
import { ProductsState } from "./slices/productsSlice";

export interface AppStore {
  products: ProductsState;
  favorites: Product[];
  cart: Cart;
}

const store = configureStore<AppStore>({
  reducer: {
    products: productsSlice.reducer,
    favorites: favoriteSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
