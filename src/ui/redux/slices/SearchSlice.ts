import { getServiceLocator } from "@/core";
import { rightOrDefault } from "@/domain";
import { createSlice } from "@reduxjs/toolkit";

const addLastSearch = getServiceLocator().addLastSearchUseCase();
const cleanSearch = getServiceLocator().cleanSearchUseCase();
const getLastSearch = getServiceLocator().getLastSearchUseCase();

const initialState: string = rightOrDefault(getLastSearch.invoke(), "");

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      return rightOrDefault(addLastSearch.invoke(action.payload), state);
    },
    removeSearch: () => {
      cleanSearch.invoke();
    },
  },
});

export const { addSearch, removeSearch } = searchSlice.actions;
