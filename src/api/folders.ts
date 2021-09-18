import { del, get, patch, post } from "./utils";
import { AxiosResponse } from "axios";

export const getFolders = async (): Promise<{
  [key: string]: FolderInterface;
}> => {
  const response: AxiosResponse<{
    [key: string]: FolderInterface;
  }> = await get({
    apiUrl: `/folders`,
    errorMessage: "There was an error getting the folders",
  });

  return response.data;
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
    apiUrl: `/folder`,
    errorMessage: "There was an error adding folders",
    body: input,
  });

  return response.data;
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
    apiUrl: `/folder`,
    errorMessage: "There was an error updating the folder",
    body: input,
  });
  return response.data;
};

export const deleteFolder = async (folder_id: string) => {
  const input = {
    folder_id,
  };

  const response: AxiosResponse<{ folder_id: string }> = await del({
    apiUrl: `/folder`,
    errorMessage: "There was an error deleting the folder",
    body: input,
  });

  return response.data;
};
