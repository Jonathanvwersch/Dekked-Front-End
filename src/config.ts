import { StringMappingType } from "typescript";

type ConfigType = {
  api: string;
  authToken: string;
  GA_TRACKING_CODE: string;
};

export const config: ConfigType = {
  api: "https://dekked-api.onrender.com",
  authToken: process.env.REACT_APP_AUTH_TOKEN!,
  GA_TRACKING_CODE: process.env.REACT_APP_GA_TRACKING_CODE!,
};
