import type React from "react";
import { useEffect, useRef, useState } from "react";
import { debounce } from "@/ui/utils";
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
  const [prevString, setPrevString] = useState(string);

  // Lazy ref initialization: the null-check-then-assign idiom is the
  // React-documented pattern for building a value once without recreating it
  // on every render (https://react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents).
  const debouncedSearchRef = useRef<ReturnType<
    typeof debounce<[value: string]>
  > | null>(null);
  if (debouncedSearchRef.current === null) {
    debouncedSearchRef.current = debounce((value: string) => {
      if (value && value.length > limit) {
        onChange(value);
        if (storePrevQuery) storePrevQuery(value);
      }
    }, 1000);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchRef.current?.(e.target.value);
    setSearchStr(e.target.value);
  };

  useEffect(() => {
    return () => debouncedSearchRef.current?.cancel();
  }, []);

  // Adjust state during render instead of in an effect when mirroring a
  // prop change: avoids the extra render an effect-driven setState would
  // cause (https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes).
  if (string !== prevString) {
    setPrevString(string);
    if (string) setSearchStr(string);
  }

  useEffect(() => {
    if (string) onChange(string);
  }, []);

  return (
    <FormComponent>
      <FormComponent.Input
        name="search"
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={handleChange}
        value={searchStr}
      />
    </FormComponent>
  );
};
export default Search;
