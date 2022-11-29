import { selectCountry, useAppDispatch, Country } from "@/domain";
import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

export interface SelectCountryInterface {
  onSelectCountry: (code: string) => void;
}

const SelectCountry: React.FC<SelectCountryInterface> = ({
  onSelectCountry,
}: SelectCountryInterface) => {
  return (
    <SelectCountryStyle>
      <ul>
        {Country.values.map((country) => (
          <li>
            <Button
              children={country.name}
              onClick={() => onSelectCountry(country.code)}
            />
          </li>
        ))}
      </ul>
    </SelectCountryStyle>
  );
};

export const SelectCountryStyle = styled.div`
  ul {
    list-style-type: none;
  }
`;

export default SelectCountry;
