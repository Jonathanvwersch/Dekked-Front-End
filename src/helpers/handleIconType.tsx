import React from "react";
import { BinderIcon, StudySetIcon } from "../assets";
import FolderIcon from "../assets/icons/FolderIcon";
import { FILETREE_TYPES } from "../shared";

export const handleIconType = (type: string, iconColor: string) => {
  if (type === FILETREE_TYPES.FOLDER) return <FolderIcon color={iconColor} />;
  else if (type === FILETREE_TYPES.BINDER)
    return <BinderIcon color={iconColor} />;
  else return <StudySetIcon color={iconColor} />;
};
