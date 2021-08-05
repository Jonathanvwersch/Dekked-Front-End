type ConfigType = {
  API: string;
  GA_TRACKING_CODE: string;
  GOOGLE_CLIENT_ID: string;
};

export const config: ConfigType = {
  API:
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
      ? process.env.REACT_APP_INTEGRATION_API!
      : process.env.REACT_APP_PRODUCTION_API!,
  GA_TRACKING_CODE: process.env.REACT_APP_GA_TRACKING_CODE!,
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
};
