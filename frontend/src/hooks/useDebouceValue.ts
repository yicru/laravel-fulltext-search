import { useState } from "react";
import { useDebounce } from "react-use";

export const useDebounceValue = <T>(value: T, ms: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useDebounce(
    () => {
      setDebouncedValue(value);
    },
    ms,
    [value]
  );

  return [debouncedValue, setDebouncedValue] as const;
};
