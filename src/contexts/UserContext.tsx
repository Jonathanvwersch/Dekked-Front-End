import { createContext } from "react";
import React from "react";
import { useStorageState } from "../hooks";

export interface UserContextProps {
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

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export const UserContextProvider: React.FC = ({ children }) => {
  const { value: user, setValue: setUser } = useStorageState<{
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
  }>({ id: "", firstName: "", lastName: "", emailAddress: "" }, "user");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
