import { createContext } from "react";
import React from "react";
import { useStorageState } from "../hooks";

export interface AuthenticationContextProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      firstName: string;
      lastName: string;
      emailAddress: string;
    }>
  >;
}

export const AuthenticationContext = createContext<AuthenticationContextProps>(
  {} as AuthenticationContextProps
);

export const AuthenticationContextProvider: React.FC = ({ children }) => {
  const { value: user, setValue: setUser } = useStorageState<{
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
  }>({ id: "", firstName: "", lastName: "", emailAddress: "" }, "user");

  return (
    <AuthenticationContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
