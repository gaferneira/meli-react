import { getLocalStorage, setLocalStorage } from "@/data/utils";
import { Product } from "@/domain/entities/product";
import { LocalStorageTypes } from "@/domain/entities/localstorage";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState: Product[] = [];

export const favoriteSlice = createSlice({
  name: LocalStorageTypes.FAVORITE,
  initialState: getLocalStorage(LocalStorageTypes.FAVORITE)
    ? JSON.parse(getLocalStorage(LocalStorageTypes.FAVORITE) as string)
    : initialState,
  reducers: {
    addFavorite: (state, action) => {
      const favorites = [...current(state), action.payload];
      setLocalStorage(LocalStorageTypes.FAVORITE, favorites);
      return favorites;
    },
    removeFavorite: (state, action) => {
      const filteredState = current(state).filter(
        (p: Product) => p.id !== action.payload.id
      );
      setLocalStorage(LocalStorageTypes.FAVORITE, filteredState);
      return filteredState;
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
