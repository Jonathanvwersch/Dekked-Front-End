import { AxiosResponse } from "axios";
import { patch, post } from "./utils";

export const googleAuthentication = async ({
  token,
  first_name,
  last_name,
  email_address,
}: {
  first_name: string;
  last_name: string;
  email_address: string;
  token: string;
}): Promise<UserInterface & { status: number; token: string }> => {
  const input = { token, first_name, last_name, email_address };

  const response = await post({
    apiUrl: "/auth/google",
    body: input,
    noAuthorisation: true,
  });

  return { ...response?.data, status: response?.status };
};

export const login = async ({
  email_address,
  password,
}: {
  email_address: string;
  password: string;
}): Promise<UserInterface & { status: number; token: string }> => {
  const input = { email_address, password };
  const response = await post({
    apiUrl: "/auth/login",
    body: input,
    noAuthorisation: true,
  });

  return { ...response?.data, status: response?.status };
};

export const logout = async () => {
  const response: AxiosResponse<{ success: boolean }> = await post({
    apiUrl: "/auth/logout",
  });

  return response?.data;
};

export const register = async ({
  email_address,
  first_name,
  last_name,
  password,
}: {
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
}): Promise<UserInterface & { status: number; token: string }> => {
  const input = { email_address, first_name, last_name, password };

  const response = await post({
    apiUrl: "/auth/register",
    body: input,
    noAuthorisation: true,
  });

  return { ...response?.data, status: response?.status };
};

export const forgetPassword = async ({
  email_address,
}: {
  email_address: string;
}): Promise<UserInterface & { success: boolean; status: number }> => {
  const input = { email_address };

  const response = await patch({
    apiUrl: "/auth/forget-password",
    body: input,
    noAuthorisation: true,
  });

  return { ...response?.data, status: response?.status };
};

export const resetPassword = async ({
  token,
  newPassword,
}: {
  newPassword: string;
  token: string;
}) => {
  const input = { password: newPassword, token };

  const response = await patch({
    apiUrl: `/auth/reset-password`,
    body: input,
    noAuthorisation: true,
  });

  return response;
};

export const verifyUserEmail = async ({
  email_address,
}: {
  email_address: string;
}): Promise<{ success: boolean }> => {
  const response: AxiosResponse<{ success: boolean }> = await post({
    apiUrl: "/auth/verify-user-email",
    body: { email_address },
    noAuthorisation: true,
  });
  return response?.data;
};
