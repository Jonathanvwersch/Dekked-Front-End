import { config } from "../../config";
import { getSessionCookie } from "../../helpers";

export const getUser = async () => {
  const uri = config.api + `/user`;
  const response = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${getSessionCookie()}`,
    },
  });
  const json = await response.json();
  return json.data.user;
};
