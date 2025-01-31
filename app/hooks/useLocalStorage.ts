import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      if (item) {
        try {
          const parsedValue = JSON.parse(item);
          setStoredValue(Array.isArray(parsedValue) ? new Set(parsedValue) : parsedValue);
        } catch (error) {
          console.error("Error parsing localStorage value:", error);
        }
      }
    }
  }, [key]);

  const setValue = (value: T) => {
    if (typeof window !== "undefined") {
      const valueToStore = value instanceof Set ? Array.from(value) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(value);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;