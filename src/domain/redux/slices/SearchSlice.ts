import { serviceLocator } from "@/core";
import { createSlice } from "@reduxjs/toolkit";

const repository = serviceLocator.searchRepository();

const initialState: string = repository.getLastSearch();

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      return repository.addLastSearch(action.payload);
    },
    removeSearch: () => {
      return repository.cleanSearch();
    },
  },
});

export const { addSearch, removeSearch } = searchSlice.actions;
