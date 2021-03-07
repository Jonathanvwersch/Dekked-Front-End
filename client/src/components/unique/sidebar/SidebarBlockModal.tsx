import React, { Dispatch, SetStateAction, useContext } from "react";

import {
  ADD,
  BinderData,
  DELETE,
  FolderData,
  RECOLOR,
  RENAME,
  StudySetData,
} from "./SidebarBlockModal.data";
import {
  FileTreeContext,
  FILETREE_TYPES,
} from "../../../contexts/FileTreeContext";
import {
  HoverCard,
  IconWrapper,
  ShadowCard,
  Spacer,
  HFlex,
  Text,
} from "../../common";
import { ThemeType } from "../../../styles/theme";
import { ThemeContext } from "styled-components";

interface SidebarBlockModalProps {
  type: string;
  id: string;
  iconColor: string;
  handleBlockModal: () => void;
  handleColorPicker: () => void;
  handleEditableText: Dispatch<SetStateAction<boolean>>;
  editableTextRef: React.RefObject<HTMLDivElement>;
  handleOpenFolder?: () => void;
}

const SidebarBlockModal: React.FC<SidebarBlockModalProps> = ({ ...props }) => {
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

  const handleDelete = () => {
    props.handleBlockModal();
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

  const handleClick = (type: string, e: MouseEvent) => {
    if (type === RENAME) handleRename();
    else if (type === DELETE) handleDelete();
    else if (type === ADD) handleAddItem();
    else if (type === RECOLOR) handleRecolor(e);
  };

  return (
    <ShadowCard width="220px">
      {modalData.map((item, index) => {
        return (
          <HoverCard
            backgroundColor={theme.colors.backgrounds.modalBackground}
            key={`SidebarBlockModal ${index}`}
            handleClick={(e: MouseEvent) => handleClick(item.type, e)}
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

export default SidebarBlockModal;
