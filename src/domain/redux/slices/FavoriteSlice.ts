import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/data/utils";
import { Product, LocalStorageTypes } from "@/domain";

const initialState: Product[] = getLocalStorage(LocalStorageTypes.FAVORITE)
  ? getLocalStorage(LocalStorageTypes.FAVORITE)
  : [];

export const favoriteSlice = createSlice({
  name: LocalStorageTypes.FAVORITE,
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const favorites = [...state, action.payload];
      setLocalStorage(LocalStorageTypes.FAVORITE, favorites);
      return favorites;
    },
    removeFavorite: (state, action) => {
      const filteredState = state.filter(
        (p: Product) => p.id !== action.payload.id
      );
      setLocalStorage(LocalStorageTypes.FAVORITE, filteredState);
      return filteredState;
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
