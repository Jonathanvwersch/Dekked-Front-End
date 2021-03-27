import React, { useContext } from "react";
import { FileTreeContext } from "../../../../contexts";
import {
  BinderData,
  FolderData,
  SIDEBAR_BLOCK_MENU,
  StudySetData,
} from "./SidebarBlockModal.data";
import { ScrollerModal } from "../../../common";
import { FILETREE_TYPES } from "../../../../shared";
import { CoordsProps } from "../../../../helpers/positionModals";

interface SidebarBlockModalProps {
  state: boolean;
  handleState: () => void;
  coords: CoordsProps;
  type: string;
  id: string;
  iconColor: string;
  handleBlockModal: () => void;
  handleColorPicker: () => void;
  handleEditableText: () => void;
  editableTextRef: React.RefObject<HTMLDivElement>;
  handleOpenFolder?: () => void;
}

const SidebarBlockModal: React.FC<SidebarBlockModalProps> = ({ ...props }) => {
  const { handleAddingAsset } = useContext(FileTreeContext);
  const modalData =
    props.type === FILETREE_TYPES.FOLDER
      ? FolderData
      : props.type === FILETREE_TYPES.BINDER
      ? BinderData
      : StudySetData;

  const handleAddItem = (e: MouseEvent) => {
    e.preventDefault();
    props.handleBlockModal();
    if (props.type === FILETREE_TYPES.FOLDER) {
      handleAddingAsset(FILETREE_TYPES.BINDER, props.id);
      props.handleOpenFolder && props.handleOpenFolder();
    } else handleAddingAsset(FILETREE_TYPES.STUDY_SET, props.id);
  };

  const handleRename = (e: MouseEvent) => {
    e.preventDefault();
    props.handleBlockModal();
    props.handleEditableText();
  };

  const handleRecolor = (e: MouseEvent) => {
    e.preventDefault();
    props.handleBlockModal();
    props.handleColorPicker();
  };

  const handleDelete = (e: MouseEvent) => {
    e.preventDefault();
    props.handleBlockModal();
  };

  const handleClick = (type: string, e: MouseEvent) => {
    if (type === SIDEBAR_BLOCK_MENU.RENAME) handleRename(e);
    else if (type === SIDEBAR_BLOCK_MENU.DELETE) handleDelete(e);
    else if (
      type === SIDEBAR_BLOCK_MENU.ADD_BINDER ||
      type === SIDEBAR_BLOCK_MENU.ADD_STUDYSET
    )
      handleAddItem(e);
    else if (type === SIDEBAR_BLOCK_MENU.RECOLOR) handleRecolor(e);
  };

  return (
    <ScrollerModal
      open={props.state}
      handleClose={props.handleState}
      coords={props.coords}
      data={modalData}
      clickFunctions={handleClick}
    />
  );
};

export default SidebarBlockModal;
