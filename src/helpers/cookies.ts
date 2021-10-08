import * as Cookies from "js-cookie";

const cookieName = "dekked-session";

export const setSessionCookie = (session: any): void => {
  Cookies.remove(cookieName);
  Cookies.set(cookieName, session, {
    secure: true,
  });
};

export const getSessionCookie: any = () => {
  const sessionCookie = Cookies.get(cookieName);

  if (sessionCookie === undefined) {
    return undefined;
  } else {
    return sessionCookie;
  }
};

export const removeCookie: any = () => {
  Cookies.remove("session");
};
