import { del, get, patch, post } from "./utils";
import { AxiosResponse } from "axios";

export const getFolders = async (): Promise<{
  [key: string]: FolderInterface;
}> => {
  const response: AxiosResponse<{
    [key: string]: FolderInterface;
  }> = await get({
    apiUrl: `/folders`,
  });

  return response?.data;
};

export const addFolder = async ({
  name,
  color,
  id,
}: {
  name: string;
  color: string;
  id?: string;
}): Promise<FolderInterface> => {
  const input = {
    color,
    name,
    id,
  };

  const response: AxiosResponse<FolderInterface> = await post({
    apiUrl: `/folders`,

    body: input,
  });

  return response?.data;
};

export const updateFolder = async (
  folder_id: string,
  {
    name,
    color,
  }: {
    name?: string;
    color?: string;
  }
): Promise<FolderInterface> => {
  const input = {
    folder_id,
    color,
    name,
  };
  const response: AxiosResponse<FolderInterface> = await patch({
    apiUrl: `/folders`,

    body: input,
  });
  return response?.data;
};

export const deleteFolder = async (folder_id: string) => {
  const input = {
    folder_id,
  };

  const response: AxiosResponse<{ folder_id: string }> = await del({
    apiUrl: `/folders`,

    body: input,
  });

  return response?.data;
};
