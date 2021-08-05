import { config } from "../../config";

export const register = async ({
  email_address,
  first_name,
  last_name,
  password,
}: {
  email_address: string;
  first_name: string;
  last_name: string;
  password: string;
}) => {
  const uri = config.API + `/register`;
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      Authorization: `Bearer`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email_address: email_address,
      first_name: first_name,
      last_name: last_name,
      password: password,
    }),
  });
  const json = await response.json();
  const status = response?.status;

  return { userData: json, errorCode: status };
};
