import { serviceLocator } from "@/core";
import { createSlice } from "@reduxjs/toolkit";

const repository = serviceLocator.countryRepository();

const initialState = repository.getCurrentCountry();

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    selectCountry: (state, action) => {
      return repository.updateCurrentCountry(action.payload);
    },
  },
});

export const { selectCountry } = countrySlice.actions;
