type ConfigType = {
  API: string;
  GA_TRACKING_CODE: string;
  GOOGLE_CLIENT_ID: string;
};

export const config: ConfigType = {
  API: process.env.REACT_APP_API_URL!,
  GA_TRACKING_CODE: process.env.REACT_APP_GA_TRACKING_CODE!,
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
};
