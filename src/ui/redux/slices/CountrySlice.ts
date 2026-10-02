import { diContainer } from "@/core/diContainer";
import diService from "@/core/diService";
import type {
  Country,
  GetCurrentCountryUseCase,
  UpdateCurrentCountryUseCase,
} from "@/domain";
import { countryValues, rightOrDefault } from "@/domain";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Country = rightOrDefault(
  diContainer
    .get<GetCurrentCountryUseCase>(diService.GetCurrentCountryUseCase)
    .invoke(),
  countryValues[0]!,
);

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    selectCountry: (state, action) => {
      const updateCurrentCountry = diContainer.get<UpdateCurrentCountryUseCase>(
        diService.UpdateCurrentCountryUseCase,
      );
      return rightOrDefault(updateCurrentCountry.invoke(action.payload), state);
    },
  },
});

export const { selectCountry } = countrySlice.actions;
