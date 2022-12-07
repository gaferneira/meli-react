import { getServiceLocator } from "@/core";
import { countryValues, rightOrDefault } from "@/domain";
import { createSlice } from "@reduxjs/toolkit";

const updateCurrentCountry = getServiceLocator().updateCurrentCountryUseCase();
const getCurrentCountry = getServiceLocator().getCurrentCountryUseCase();

const initialState = rightOrDefault(
  getCurrentCountry.invoke(),
  countryValues[0]
);

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    selectCountry: (state, action) => {
      return rightOrDefault(updateCurrentCountry.invoke(action.payload), state);
    },
  },
});

export const { selectCountry } = countrySlice.actions;
