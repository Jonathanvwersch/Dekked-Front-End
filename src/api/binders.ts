import { del, get, patch, post } from "./utils";
import { AxiosResponse } from "axios";

export const getBinders = async (): Promise<{
  [key: string]: BinderInterface;
}> => {
  const response: AxiosResponse<{
    [key: string]: BinderInterface;
  }> = await get({
    apiUrl: "/binders",
  });

  return response?.data;
};

export const addBinder = async ({
  name,
  color,
  folder_id,
  id,
}: BinderInterface): Promise<BinderInterface> => {
  const input = { name, color, folder_id, id };
  const response: AxiosResponse<BinderInterface> = await post({
    apiUrl: "/binders",
    body: input,
  });

  return response?.data;
};

export const updateBinder = async (
  binder_id: string,
  {
    name,
    color,
  }: {
    name?: string;
    color?: string;
  }
) => {
  const input = { name, color, binder_id };
  await patch({
    apiUrl: "/binders",
    body: input,
  });
};

export const deleteBinder = async (binder_id: string) => {
  const input = { binder_id };
  await del({
    apiUrl: "/binders",
    body: input,
  });
};
