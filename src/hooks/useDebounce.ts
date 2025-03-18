import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value); // Set the debounced value after the delay
    }, delay);

    return () => {
      // Cleanup previous timeout if value changes to ensures that only the latest input change is considered, preventing unnecessary calls.
      clearTimeout(handler); 
      
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;