import { config } from "../config";
import { getSessionCookie } from "../helpers";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type RequestBuilderType = {
  apiUrl: string;
  baseUrl?: string;
  body?: object;
  noAuthorisation?: boolean;
};

type HttpMethods = "GET" | "PUT" | "POST" | "PATCH" | "DELETE";
type HttpResponse = ({
  apiUrl,
  baseUrl,
  body,
  noAuthorisation,
}: RequestBuilderType) => Promise<AxiosResponse<any>>;

const requestBuilder =
  (method: HttpMethods) =>
  async ({ apiUrl, baseUrl, body, noAuthorisation }: RequestBuilderType) => {
    const headers: AxiosRequestConfig["headers"] = {
      "Content-type": "application/json",
    };

    if (!noAuthorisation && getSessionCookie()) {
      headers["Authorization"] = `Bearer ${getSessionCookie()}`;
    }

    const requestConfig: AxiosRequestConfig = {
      method,
      url: baseUrl ? `${baseUrl}/api/v1${apiUrl}` : `${config.API}${apiUrl}`,
      data: body,
      headers,
    };

    return await axios(requestConfig);
  };

export const get: HttpResponse = requestBuilder("GET");
export const put: HttpResponse = requestBuilder("PUT");
export const post: HttpResponse = requestBuilder("POST");
export const patch: HttpResponse = requestBuilder("PATCH");
export const del: HttpResponse = requestBuilder("DELETE");
