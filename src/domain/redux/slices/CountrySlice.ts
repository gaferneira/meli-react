import { getLocalStorage, setLocalStorage } from "@/data/utils";
import { LocalStorageTypes, Country } from "@/domain";
import { createSlice } from "@reduxjs/toolkit";

const getCountry = () => {
  const code = getLocalStorage(LocalStorageTypes.COUNTRY);
  return Country.findByCode(code ?? "");
};

const initialState = getCountry();

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    selectCountry: (state, action) => {
      setLocalStorage(LocalStorageTypes.COUNTRY, action.payload);
      return action.payload;
    },
  },
});

export const { selectCountry } = countrySlice.actions;