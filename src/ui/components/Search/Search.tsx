import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { FormComponent } from "@/ui";

interface Props {
  placeholder: string;
  onChange: (query: string) => void;
  limit?: number;
  string?: string;
  storePrevQuery?: (query: string) => void;
}

const Search: React.FC<Props> = ({
  placeholder,
  limit = 1,
  string,
  onChange,
  storePrevQuery,
}) => {
  const [searchStr, setSearchStr] = useState<string>("");
  const debouncedSearch = useRef(
    debounce((value) => {
      if (value && value.length > limit) {
        onChange(value);
        if (storePrevQuery) storePrevQuery(value);
      }
    }, 1000)
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
    setSearchStr(e.target.value);
  };

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  useEffect(() => {
    if (string) setSearchStr(string);
  }, [string]);

  useEffect(() => {
    if (string) onChange(string);
  }, []);

  return (
    <FormComponent>
      <FormComponent.Input
        name="search"
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        value={searchStr}
      />
    </FormComponent>
  );
};
export default Search;
