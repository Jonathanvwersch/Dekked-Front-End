import { get, patch } from "./utils";
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

  return response.data;
};

export const getUser = async (): Promise<UserInterface> => {
  const response: AxiosResponse<UserInterface> = await get({
    apiUrl: "/user",
    errorMessage: "There was an error getting the user",
  });
  return response.data;
};
