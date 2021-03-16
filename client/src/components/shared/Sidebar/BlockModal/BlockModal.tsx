import React, { Dispatch, SetStateAction, useContext } from "react";
import { ThemeContext } from "styled-components";
import { ThemeType } from "../../../../styles/theme";
import { FileTreeContext } from "../../../../contexts";
import { FILETREE_TYPES } from "../../../../contexts/FileTreeContext";
import {
  BinderData,
  FolderData,
  SIDEBAR_BLOCK_MENU,
  StudySetData,
} from "./BlockModal.data";
import {
  HFlex,
  HoverCard,
  IconWrapper,
  ShadowCard,
  Spacer,
  Text,
} from "../../../common";

interface BlockModalProps {
  type: string;
  id: string;
  iconColor: string;
  handleBlockModal: () => void;
  handleColorPicker: () => void;
  handleEditableText: Dispatch<SetStateAction<boolean>>;
  editableTextRef: React.RefObject<HTMLDivElement>;
  handleOpenFolder?: () => void;
}

const BlockModal: React.FC<BlockModalProps> = ({ ...props }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const { handleAddingAsset } = useContext(FileTreeContext);
  const modalData =
    props.type === FILETREE_TYPES.FOLDER
      ? FolderData
      : props.type === FILETREE_TYPES.BINDER
      ? BinderData
      : StudySetData;

  const handleAddItem = () => {
    props.handleBlockModal();
    if (props.type === FILETREE_TYPES.FOLDER) {
      handleAddingAsset(FILETREE_TYPES.BINDER, props.id);
      props.handleOpenFolder && props.handleOpenFolder();
    } else handleAddingAsset(FILETREE_TYPES.STUDY_SET, props.id);
  };

  const handleRename = () => {
    props.handleBlockModal();
    props.handleEditableText(true);
    setTimeout(function () {
      props.editableTextRef.current?.focus();
    }, 50);
  };

  const handleRecolor = (e: MouseEvent) => {
    e.preventDefault();
    props.handleBlockModal();
    props.handleColorPicker();
  };

  const handleDelete = () => {
    props.handleBlockModal();
  };

  const handleClick = (type: string, e: MouseEvent) => {
    if (type === SIDEBAR_BLOCK_MENU.RENAME) handleRename();
    else if (type === SIDEBAR_BLOCK_MENU.DELETE) handleDelete();
    else if (
      type === SIDEBAR_BLOCK_MENU.ADD_BINDER ||
      type === SIDEBAR_BLOCK_MENU.ADD_STUDYSET
    )
      handleAddItem();
    else if (type === SIDEBAR_BLOCK_MENU.RECOLOR) handleRecolor(e);
  };

  return (
    <ShadowCard width="220px">
      {modalData.map((item, index) => {
        return (
          <HoverCard
            backgroundColor={theme.colors.backgrounds.modalBackground}
            key={`BlockModal ${index}`}
            handleClick={(e: MouseEvent) => handleClick(item.action, e)}
            padding="8px 16px"
          >
            <HFlex>
              <IconWrapper>{item.icon}</IconWrapper>
              <Spacer width={theme.spacers.size8} />
              <Text>{item.action}</Text>
            </HFlex>
          </HoverCard>
        );
      })}
    </ShadowCard>
  );
};

export default BlockModal;
