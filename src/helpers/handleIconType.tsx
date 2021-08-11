import React from "react";
import { BinderIcon, StudySetIcon, FolderIcon } from "dekked-design-system";
import { FILETREE_TYPES } from "../shared";

export const handleIconType = (type: string, iconColor: string) => {
  if (type === FILETREE_TYPES.FOLDER) return <FolderIcon color={iconColor} />;
  else if (type === FILETREE_TYPES.BINDER)
    return <BinderIcon color={iconColor} />;
  else return <StudySetIcon color={iconColor} />;
};
