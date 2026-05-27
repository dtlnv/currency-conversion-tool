import { useState, useEffect, useRef } from "react";

export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timer = useRef<number>(0);

  useEffect(() => {
    timer.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer.current);
    }
  }, [value, delay]);

  return debouncedValue;
}
