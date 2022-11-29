import { FormContainer } from "@/ui";
import React, { useRef } from "react";
import debounce from "lodash.debounce";

interface Props {
  placeholder: string;
  onChange: (query: string) => void;
  limit?: number;
}

const Search: React.FC<Props> = ({ placeholder, onChange, limit = 1 }) => {
  const debouncedSearch = useRef(
    debounce((value) => {
      if (value && value.length > limit) onChange(value);
    }, 300)
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <FormContainer>
      <input
        name="search"
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </FormContainer>
  );
};
export default Search;
