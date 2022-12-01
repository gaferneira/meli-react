import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { addSearch, useAppDispatch } from "@/domain";
import { FormContainer } from "@/ui";

interface Props {
  placeholder: string;
  onChange: (query: string) => void;
  limit?: number;
  string?: string;
}

const Search: React.FC<Props> = ({
  placeholder,
  onChange,
  limit = 1,
  string,
}) => {
  const dispatch = useAppDispatch();
  const [searchStr, setSearchStr] = useState<string>("");
  const debouncedSearch = useRef(
    debounce((value) => {
      if (value && value.length > limit) {
        onChange(value);
        dispatch(addSearch(value));
      }
    }, 1000)
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
    setSearchStr(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (string) setSearchStr(string);
  }, [string]);

  useEffect(() => {
    if (string) onChange(string);
  }, []);

  return (
    <FormContainer>
      <input
        name="search"
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        value={searchStr}
      />
    </FormContainer>
  );
};
export default Search;
