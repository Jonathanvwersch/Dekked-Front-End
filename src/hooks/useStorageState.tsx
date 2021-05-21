import { useEffect, useState } from "react";

// use in place of usestate for state variables you wish to save in local storage
export function useStorageState<T>(defaultValue: T, key: string) {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return { value, setValue };
}
