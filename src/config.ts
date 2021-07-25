type ConfigType = {
  api: string;
  GA_TRACKING_CODE: string;
  GOOGLE_CLIENT_ID: string;
};

export const config: ConfigType = {
  api: "https://dekked-api.onrender.com",
  GA_TRACKING_CODE: process.env.REACT_APP_GA_TRACKING_CODE!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
};
