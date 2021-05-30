import { createContext, useState } from "react";
import React from "react";
import { useMutation } from "react-query";
import { login } from "../services/authentication/login";

export interface AuthenticationContextProps {}

export const AuthenticationContext = createContext<AuthenticationContextProps>(
  {} as AuthenticationContextProps
);

export const AuthenticationContextProvider: React.FC = ({ children }) => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [userId, setUserId] = useState<string>();

  const { mutate: loginUser } = useMutation(`login-${userId}`, login);

  return (
    <AuthenticationContext.Provider value={{}}>
      {children}
    </AuthenticationContext.Provider>
  );
};
