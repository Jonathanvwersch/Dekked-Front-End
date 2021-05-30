import { isEmpty } from "lodash";

export const validateEmail = (email: string | undefined) => {
  if (!email) return true;
  const mailformat =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (email.match(mailformat)) return true;
  else return false;
};

export const isAnyRequiredFieldPristine = (fields: any[]) => {
  if (isEmpty(fields)) return true;
  for (const field of fields) {
    if (!field) return true;
  }
  return false;
};

export const validatePassword = (password: string | undefined) => {
  if (!password) return true;
  return password.length >= 8;
};
