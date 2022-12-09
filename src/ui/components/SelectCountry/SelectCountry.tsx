import { countryValues } from "@/domain";
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
      <ul className="select-country">
        {countryValues.map((country) => (
          <li key={country.code}>
            <Button onClick={() => onSelectCountry(country.code)}>
              {country.name}
            </Button>
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
