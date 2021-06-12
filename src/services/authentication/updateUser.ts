import { config } from "../../config";
import { getSessionCookie } from "../../helpers";
import { getUser } from "./getUser";

export const updateUser = async ({
  first_name,
  last_name,
  email_address,
}: {
  first_name?: string;
  last_name?: string;
  email_address?: string;
}) => {
  const uri = config.api + `/user`;
  const response = await fetch(uri, {
    method: "PUT",
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
  await getUser();
  return { json, status };
};
