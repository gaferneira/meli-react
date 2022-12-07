import { createSlice } from "@reduxjs/toolkit";
import { Product, rightOrDefault } from "@/domain";
import { getServiceLocator } from "@/core";

const addFavoriteUseCase = getServiceLocator().addFavoriteUseCase();
const removeFavoriteUseCase = getServiceLocator().removeFavoriteUseCase();
const getFavorites = getServiceLocator().getFavoritesUseCase();

const initialState: Product[] = rightOrDefault(getFavorites.invoke(), []);

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      return rightOrDefault(addFavoriteUseCase.invoke(action.payload), state);
    },
    removeFavorite: (state, action) => {
      return rightOrDefault(
        removeFavoriteUseCase.invoke(action.payload),
        state
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
