import React, { useState } from "react";
import {
  BinderData,
  FolderData,
  SIDEBAR_BLOCK_MENU,
  StudySetData,
} from "./SidebarBlockModal.data";
import { ScrollerModal } from "../../../common";
import { FILETREE_TYPES, CoordsType } from "../../../../shared";
import { getChildType, useAddAsset, useDeleteAsset } from "../../../../helpers";
import DeleteModal from "../../DeleteModal/DeleteModal";

interface SidebarBlockModalProps {
  isOpen: boolean;
  handleClose: () => void;
  type: string;
  id: string;
  handleColorPicker: () => void;
  coords: CoordsType | undefined;
  folderId?: string;
}

const SidebarBlockModal: React.FC<SidebarBlockModalProps> = ({
  isOpen,
  handleClose,
  handleColorPicker,
  coords,
  id,
  type,
  folderId,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { addAsset } = useAddAsset();
  const { deleteAsset } = useDeleteAsset();

  const modalData =
    type === FILETREE_TYPES.FOLDER
      ? FolderData
      : type === FILETREE_TYPES.BINDER
      ? BinderData
      : StudySetData;

  const handleClick = (blockAction: string) => {
    if (blockAction === SIDEBAR_BLOCK_MENU.DELETE) {
      setIsDeleteModalOpen(true);
    } else if (
      blockAction === SIDEBAR_BLOCK_MENU.ADD_BINDER ||
      blockAction === SIDEBAR_BLOCK_MENU.ADD_STUDYSET
    ) {
      handleClose();
      addAsset(
        getChildType(type as FILETREE_TYPES),
        type === FILETREE_TYPES.BINDER ? folderId : id,
        type === FILETREE_TYPES.BINDER ? id : undefined
      );
    } else if (blockAction === SIDEBAR_BLOCK_MENU.RECOLOR) {
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
          handleClose={() => setIsDeleteModalOpen(false)}
          isOpen={isDeleteModalOpen}
          handleMainButton={() => {
            deleteAsset(type, id);
          }}
          bodyText={deleteModalBodyText()}
        />
      ) : null}
    </>
  );
};

export default React.memo(SidebarBlockModal);
