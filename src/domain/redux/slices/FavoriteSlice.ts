import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/domain";
import { getServiceLocator } from "@/core";

const repository = getServiceLocator().favoriteRepository();

const initialState: Product[] = repository.getFavorites();

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      return repository.addFavorite(action.payload);
    },
    removeFavorite: (state, action) => {
      return repository.removeFavorite(action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
