import React, { Dispatch, SetStateAction, useContext } from "react";
import { useTheme } from "react-jss";

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
import { ThemeType } from "../../../theme";

interface SidebarBlockModalProps {
  type: string;
  id: string;
  handleBlockModal: () => void;
  handleEditableText: Dispatch<SetStateAction<boolean>>;
  editableTextRef: React.RefObject<HTMLDivElement>;
  handleOpenFolder?: () => void;
}

const SidebarBlockModal: React.FC<SidebarBlockModalProps> = ({ ...props }) => {
  const theme: ThemeType = useTheme();
  const { handleAddingAsset, updateAsset } = useContext(FileTreeContext);
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

  const handleRecolor = () => {
    props.handleBlockModal();
    updateAsset(props.type, props.id, { color: "blue" });
  };

  const handleClick = (type: string) => {
    if (type === RENAME) handleRename();
    else if (type === DELETE) handleDelete();
    else if (type === ADD) handleAddItem();
    else if (type === RECOLOR) handleRecolor();
  };

  return (
    <ShadowCard width="220px">
      {modalData.map((item, index) => {
        return (
          <HoverCard
            backgroundColor={theme.colors.backgrounds.modalBackground}
            key={`SidebarBlockModal ${index}`}
            handleClick={() => handleClick(item.type)}
          >
            <HFlex padding="8px 16px">
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
