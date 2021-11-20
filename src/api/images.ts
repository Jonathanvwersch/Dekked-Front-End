import { AxiosResponse } from "axios";
import { post } from "./utils";

const apiUrl = "/images";

export const uploadImage = async (image: any) => {
  const form = new FormData();
  form.append("image", image);

  const response: AxiosResponse<{ imagePath: string }> = await post({
    apiUrl,
    body: form,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response?.data;
};

export const getImage = async (key: string) => {
  const response: AxiosResponse<{ imagePath: string }> = await post({
    apiUrl: `${apiUrl}/${key}`,
  });
  return response?.data;
};
