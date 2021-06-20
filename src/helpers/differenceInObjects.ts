import { isEqual, isObject, transform } from "lodash";

type ExactObject<T = any> = { [key: string]: T };

export const differenceInObjects = (object: ExactObject, base: ExactObject) => {
  const changes = (object: ExactObject, base: ExactObject) => {
    return transform<ExactObject, ExactObject>(object, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        result[key] =
          isObject(value) && isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  };
  return changes(object, base);
};
