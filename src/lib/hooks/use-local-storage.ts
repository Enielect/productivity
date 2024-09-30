// import { useEffect, useState } from "react";

import { useEffect, useState } from "react";

//implementing a type-safe useLocalStorage hook

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) setStoredValue(JSON.parse(item) as T);
  }, [key]);

  const setItem = (item: T) => {
    setStoredValue(item);
    localStorage.setItem(key, JSON.stringify(item));
  };

  return [storedValue, setItem];
}
