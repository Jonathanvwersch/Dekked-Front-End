import React, { useContext } from "react";
import { SidebarContext } from "../../../../contexts";
import {
  BinderData,
  FolderData,
  SIDEBAR_BLOCK_MENU,
  StudySetData,
} from "./SidebarBlockModal.data";
import { ScrollerModal } from "../../../common";
import { FILETREE_TYPES, CoordsType } from "../../../../shared";
import { getChildType } from "../../../../helpers";

interface SidebarBlockModalProps {
  state: boolean;
  handleState: () => void;
  type: string;
  id: string;
  iconColor: string;
  handleBlockModal: () => void;
  handleColorPicker: () => void;
  handleEditableText: () => void;
  editableTextRef: React.RefObject<HTMLDivElement>;
  coords: CoordsType | undefined;
}

const SidebarBlockModal: React.FC<SidebarBlockModalProps> = ({ ...props }) => {
  const { handleAddBlock } = useContext(SidebarContext);

  const modalData =
    props.type === FILETREE_TYPES.FOLDER
      ? FolderData
      : props.type === FILETREE_TYPES.BINDER
      ? BinderData
      : StudySetData;

  const handleAddItem = (e: MouseEvent) => {
    e.preventDefault();
    props.handleBlockModal();
    handleAddBlock(props.id, getChildType(props.type as FILETREE_TYPES));
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
    if (type === SIDEBAR_BLOCK_MENU.DELETE) handleDelete(e);
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
