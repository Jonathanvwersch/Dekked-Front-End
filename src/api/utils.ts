import { config } from "../config";
import { getSessionCookie } from "../helpers";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

type RequestBuilderType = {
  apiUrl: string;
  baseUrl?: string;
  body?: object;
  noAuthorisation?: boolean;
  errorMessage?: string;
};

type HttpMethods = "GET" | "PUT" | "POST" | "PATCH" | "DELETE";
type HttpResponse = ({
  apiUrl,
  baseUrl,
  body,
  noAuthorisation,
  errorMessage,
}: RequestBuilderType) => Promise<AxiosResponse<any>>;

const requestBuilder =
  (method: HttpMethods) =>
  async ({
    apiUrl,
    baseUrl,
    body,
    noAuthorisation,
    errorMessage,
  }: RequestBuilderType) => {
    const headers: AxiosRequestConfig["headers"] = {
      "Content-type": "application/json",
    };

    if (!noAuthorisation) {
      headers["Authorization"] = `Bearer ${getSessionCookie()}`;
    }

    const requestConfig: AxiosRequestConfig = {
      method,
      url: baseUrl ? `${baseUrl}${apiUrl}` : `${config.API}${apiUrl}`,
      data: body,
      headers,
    };

    console.log(requestConfig);

    return axios(requestConfig)
      .then((res: any) => {
        console.log(apiUrl, res);
        return res;
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          const errorResponse = err.response.data;
          const errorStatus = err.response.status;

          if (errorResponse.exception) {
            throw Error(`${errorStatus}: ${errorMessage}`);
          } else {
            throw err;
          }
        } else {
          console.error(err);
        }
      });
  };

export const get: HttpResponse = requestBuilder("GET");
export const put: HttpResponse = requestBuilder("PUT");
export const post: HttpResponse = requestBuilder("POST");
export const patch: HttpResponse = requestBuilder("PATCH");
export const del: HttpResponse = requestBuilder("DELETE");