import { config } from "../../config";

export const login = async ({
  email_address,
  password,
}: {
  email_address: string;
  password: string;
}) => {
  const uri = config.api + `/login`;
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email_address,
      password,
    }),
  });

  const status = response?.status;
  const json = await response.json();
  return { userData: json, errorCode: status };
};
