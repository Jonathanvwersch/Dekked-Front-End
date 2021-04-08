import { useEffect, useState } from "react";

// use in place of usestate for state variables you wish to save in local storage
export const useStorageState = (defaultValue: any, key: string) => {
  const [value, setValue] = useState<any>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
