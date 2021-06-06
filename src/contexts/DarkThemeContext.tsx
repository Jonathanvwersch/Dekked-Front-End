import { createContext } from "react";
import React from "react";
import { useStorageState } from "../hooks";

export interface DarkThemeContextProps {
  isDarkTheme: boolean;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DarkThemeContext = createContext<DarkThemeContextProps>(
  {} as DarkThemeContextProps
);

export const DarkThemeContextProvider: React.FC = ({ children }) => {
  const { value: isDarkTheme, setValue: setIsDarkTheme } =
    useStorageState<boolean>(false, "color-theme");
  return (
    <DarkThemeContext.Provider
      value={{
        isDarkTheme,
        setIsDarkTheme,
      }}
    >
      {children}
    </DarkThemeContext.Provider>
  );
};
