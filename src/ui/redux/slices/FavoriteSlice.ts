import { AddFavoriteUseCase } from "./../../../domain/usecases/products/AddFavoriteUseCase";
import { createSlice } from "@reduxjs/toolkit";
import {
  GetFavoritesUseCase,
  Product,
  RemoveFavoriteUseCase,
  rightOrDefault,
} from "@/domain";
import { diContainer } from "@/core/diContainer";
import diService from "@/core/diService";

const initialState: Product[] = rightOrDefault(
  diContainer.get<GetFavoritesUseCase>(diService.GetFavoritesUseCase).invoke(),
  []
);

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const addFavoriteUseCase = diContainer.get<AddFavoriteUseCase>(
        diService.AddFavoriteUseCase
      );
      return rightOrDefault(addFavoriteUseCase.invoke(action.payload), state);
    },
    removeFavorite: (state, action) => {
      const removeFavoriteUseCase = diContainer.get<RemoveFavoriteUseCase>(
        diService.RemoveFavoriteUseCase
      );
      return rightOrDefault(
        removeFavoriteUseCase.invoke(action.payload),
        state
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
