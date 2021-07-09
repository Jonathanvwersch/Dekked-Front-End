import { FILETREE_TYPES } from "../../shared";
import { updateBinder } from "./bindersApi";
import { updateFolder } from "./foldersApi";
import { updateStudySet } from "./studySetsApi";

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
    updateFolder(id, { name, color });
  } else if (type === FILETREE_TYPES.BINDER) {
    updateBinder(id, { name, color });
  } else {
    updateStudySet(id, { name, color });
  }
};
