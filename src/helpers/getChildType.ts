import { FILETREE_TYPES } from "../shared";

export const getChildType = (type: FILETREE_TYPES) => {
  if (type === FILETREE_TYPES.FOLDER) return FILETREE_TYPES.BINDER;
  else if (type === FILETREE_TYPES.BINDER) return FILETREE_TYPES.STUDY_SET;
  return FILETREE_TYPES.FOLDER;
};
