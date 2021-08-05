import { config } from "../../config";
import { getSessionCookie } from "../../helpers";

export const updateUser = async ({
  first_name,
  last_name,
  email_address,
}: {
  first_name?: string;
  last_name?: string;
  email_address?: string;
}) => {
  const uri = config.API + `/user`;
  const response = await fetch(uri, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getSessionCookie()}`,
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email_address,
    }),
  });

  const status = response?.status;
  const json = await response.json();
  return { json, status };
};
