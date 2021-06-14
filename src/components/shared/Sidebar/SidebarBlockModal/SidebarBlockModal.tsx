import React, { SyntheticEvent, useContext, useState } from "react";
import { SidebarBlocksContext } from "../../../../contexts";
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
  handleColorPicker: () => void;
  coords: CoordsType | undefined;
}

const SidebarBlockModal: React.FC<SidebarBlockModalProps> = ({
  isOpen,
  handleClose,
  handleColorPicker,
  coords,
  id,
  type,
}) => {
  const { handleAddBlock, handleDeleteBlock } =
    useContext(SidebarBlocksContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const modalData =
    type === FILETREE_TYPES.FOLDER
      ? FolderData
      : type === FILETREE_TYPES.BINDER
      ? BinderData
      : StudySetData;

  const handleClick = (blockAction: string) => {
    if (blockAction === SIDEBAR_BLOCK_MENU.DELETE) {
      setIsDeleteModalOpen(true);
      handleClose();
    } else if (
      blockAction === SIDEBAR_BLOCK_MENU.ADD_BINDER ||
      blockAction === SIDEBAR_BLOCK_MENU.ADD_STUDYSET
    ) {
      handleClose();
      handleAddBlock(id, getChildType(type as FILETREE_TYPES));
    } else if (blockAction === SIDEBAR_BLOCK_MENU.RECOLOR) {
      handleClose();
      handleColorPicker();
    }
  };

  const deleteModalBodyText = () => {
    switch (type) {
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
      {isOpen ? (
        <ScrollerModal
          open={isOpen}
          handleClose={handleClose}
          coords={coords}
          data={modalData}
          clickFunctions={handleClick}
        />
      ) : null}
      {isDeleteModalOpen ? (
        <DeleteModal
          handleClose={(e: SyntheticEvent) => {
            e?.preventDefault();
            setIsDeleteModalOpen(false);
          }}
          isOpen={isDeleteModalOpen}
          handleMainButton={(e: SyntheticEvent) => {
            e.preventDefault();
            handleDeleteBlock(id, type);
          }}
          bodyText={deleteModalBodyText()}
        />
      ) : null}
    </>
  );
};

export default SidebarBlockModal;
