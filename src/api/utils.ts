import { config } from "../config";
import { getSessionCookie } from "../helpers";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type RequestBuilderType = {
  apiUrl: string;
  baseUrl?: string;
  body?: object;
  noAuthorisation?: boolean;
  headers?: AxiosRequestConfig["headers"];
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
  async ({
    apiUrl,
    baseUrl,
    body,
    noAuthorisation,
    headers,
  }: RequestBuilderType) => {
    const defaultHeaders: AxiosRequestConfig["headers"] = {
      "Content-type": "application/json",
      ...headers,
    };

    if (!noAuthorisation && getSessionCookie()) {
      defaultHeaders["Authorization"] = `Bearer ${getSessionCookie()}`;
    }

    const requestConfig: AxiosRequestConfig = {
      method,
      url: baseUrl ? `${baseUrl}/api/v1${apiUrl}` : `${config.API}${apiUrl}`,
      data: body,
      headers: defaultHeaders,
    };

    return await axios(requestConfig);
  };

export const get: HttpResponse = requestBuilder("GET");
export const put: HttpResponse = requestBuilder("PUT");
export const post: HttpResponse = requestBuilder("POST");
export const patch: HttpResponse = requestBuilder("PATCH");
export const del: HttpResponse = requestBuilder("DELETE");
