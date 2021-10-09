import { getSessionCookie } from ".";

export const uniqueApiKey = (apiKey: string) => {
  return `${getSessionCookie()}-${apiKey}`;
};
