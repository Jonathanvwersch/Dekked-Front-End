import * as Cookies from "js-cookie";

export const setSessionCookie = (session: any): void => {
  Cookies.remove("session");
  Cookies.set("session", session, {
    secure: true,
  });
};

export const getSessionCookie: any = () => {
  const sessionCookie = Cookies.get("session");

  if (sessionCookie === undefined) {
    return undefined;
  } else {
    return sessionCookie;
  }
};

export const removeCookie: any = () => {
  Cookies.remove("session");
};
