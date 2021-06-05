type ConfigType = {
  api: string;
  GA_TRACKING_CODE: string;
};

export const config: ConfigType = {
  api: "https://dekked-api.onrender.com",
  GA_TRACKING_CODE: process.env.REACT_APP_GA_TRACKING_CODE!,
};
