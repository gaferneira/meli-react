import {
  GetLastSearchUseCase,
  AddLastSearchUseCase,
  CleanSearchUseCase,
  rightOrDefault,
} from "@/domain";
import { createSlice } from "@reduxjs/toolkit";
import { diContainer } from "@/core/diContainer";
import diService from "@/core/diService";

const initialState: string = rightOrDefault(
  diContainer
    .get<GetLastSearchUseCase>(diService.GetLastSearchUseCase)
    .invoke(),
  ""
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      const addLastSearch = diContainer.get<AddLastSearchUseCase>(
        diService.AddLastSearchUseCase
      );
      return rightOrDefault(addLastSearch.invoke(action.payload), state);
    },
    removeSearch: () => {
      const cleanSearch = diContainer.get<CleanSearchUseCase>(
        diService.CleanSearchUseCase
      );
      cleanSearch.invoke();
    },
  },
});

export const { addSearch, removeSearch } = searchSlice.actions;
