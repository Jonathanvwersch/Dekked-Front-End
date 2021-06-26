import { FILETREE_TYPES } from "../../shared";
import { updateBinder } from "./binders-api";
import { updateFolder } from "./folders-api";
import { updateStudySet } from "./studySets-api";

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
