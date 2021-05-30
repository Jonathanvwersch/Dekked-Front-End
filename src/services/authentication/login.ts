import { config } from "../../config";

export const login = async ({
  email_address,
  password,
  token,
}: {
  email_address: string;
  password: string;
  token: string;
}) => {
  const uri = config.api + `/register`;
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email_address,
      password,
    }),
  });
  const json = await response.json();
  return json;
};
