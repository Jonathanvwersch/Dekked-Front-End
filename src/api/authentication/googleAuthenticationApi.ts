import { config } from "../../config";

export const googleAuthentication = async ({
  token,
  first_name,
  last_name,
  email_address,
}: {
  token: string;
  first_name: string;
  last_name: string;
  email_address: string;
}) => {
  const uri = config.api + `/auth/google`;
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      token,
      first_name,
      last_name,
      email_address,
    }),
  });

  const status = response.status;
  const json = await response?.json();

  return { userData: json, errorCode: status };
};
