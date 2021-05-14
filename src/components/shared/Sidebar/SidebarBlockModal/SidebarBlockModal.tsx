import React, { useContext, useState } from "react";
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
import DeleteModal from "../../DeleteModal/DeleteModal";

interface SidebarBlockModalProps {
  isOpen: boolean;
  handleClose: () => void;
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
  const { handleAddBlock, handleDeleteBlock } = useContext(SidebarContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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
    setIsDeleteModalOpen(true);
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

  const deleteModalBodyText = () => {
    switch (props.type) {
      case FILETREE_TYPES.FOLDER:
        return "sidebar.deleteModal.deleteFolder";
      case FILETREE_TYPES.BINDER:
        return "sidebar.deleteModal.deleteBinder";
      case FILETREE_TYPES.STUDY_SET:
        return "sidebar.deleteModal.deleteStudySet";
    }
  };

  return (
    <>
      {props.isOpen ? (
        <ScrollerModal
          open={props.isOpen}
          handleClose={props.handleClose}
          coords={props.coords}
          data={modalData}
          clickFunctions={handleClick}
        />
      ) : null}
      {isDeleteModalOpen ? (
        <DeleteModal
          handleClose={() => setIsDeleteModalOpen(false)}
          isOpen={isDeleteModalOpen}
          handleMainButton={() => handleDeleteBlock(props.id, props.type)}
          bodyText={deleteModalBodyText()}
        />
      ) : null}
    </>
  );
};

export default SidebarBlockModal;
