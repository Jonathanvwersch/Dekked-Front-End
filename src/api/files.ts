import { FILETREE_TYPES } from "../shared";
import { updateBinder } from "./binders";
import { updateFolder } from "./folders";
import { updateStudySet } from "./studySets";
import { AxiosResponse } from "axios";
import { get } from "./utils";

export const updateAsset = async (
  id: string,
  type: string,
  {
    name,
    color,
  }: {
    name?: string;
    color?: string;
  }
) => {
  if (type === FILETREE_TYPES.FOLDER) {
    await updateFolder(id, { name, color });
  } else if (type === FILETREE_TYPES.BINDER) {
    await updateBinder(id, { name, color });
  } else {
    await updateStudySet(id, { name, color });
  }
};

export const getFileTree = async () => {
  const response: AxiosResponse<FileTreeInterface> = await get({
    apiUrl: `/file-tree`,
  });
  return response?.data;
};

export const getFiles = async () => {
  const response: AxiosResponse<LoadFilesInterface> = await get({
    apiUrl: `/files`,
  });
  return response?.data;
};
