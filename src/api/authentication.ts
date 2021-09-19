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
    errorMessage: "Google authentication failed",
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
    apiUrl: "/login",
    body: input,
    noAuthorisation: true,
    errorMessage: "Failed to log in",
  });

  return { ...response?.data, status: response?.status };
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
    apiUrl: "/register",
    body: input,
    noAuthorisation: true,
    errorMessage: "Failed to sign up",
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
    apiUrl: "/forget-password",
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
    apiUrl: `/reset-password`,
    body: input,
    noAuthorisation: true,
  });

  return response;
};
