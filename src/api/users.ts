import { get, patch, post } from "./utils";
import { AxiosResponse } from "axios";

export const updateUser = async ({
  first_name,
  last_name,
  email_address,
}: {
  first_name?: string;
  last_name?: string;
  email_address?: string;
}): Promise<UserInterface> => {
  const input = { first_name, last_name, email_address };
  const response: AxiosResponse<UserInterface> = await patch({
    apiUrl: "/user",
    errorMessage: "There was an error updating the binder",
    body: input,
  });

  return response?.data;
};

export const getUser = async (): Promise<UserInterface> => {
  const response: AxiosResponse<UserInterface> = await get({
    apiUrl: "/user",
    errorMessage: "There was an error getting the user",
  });
  return response?.data;
};

export const verifyUserEmail = async ({
  email_address,
}: {
  email_address: string;
}): Promise<{ success: boolean }> => {
  const response: AxiosResponse<{ success: boolean }> = await post({
    apiUrl: "/verify-user-email",
    errorMessage: "There was an error verifying the email address",
    body: { email_address },
    noAuthorisation: true,
  });
  return response?.data;
};
