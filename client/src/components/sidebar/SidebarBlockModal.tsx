import React, { useContext } from "react";
import { useTheme } from "react-jss";
import {
  HorizontalFlexContainer,
  HoverCard,
  IconWrapper,
  ShadowCard,
  Spacer,
  Text,
} from "../common";
import { ThemeType } from "../../theme";
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
} from "../../contexts/FileTreeContext";

interface SidebarBlockModalProps {
  type: string;
  id: string;
  handleBlockModal: () => void;
}

const SidebarBlockModal: React.FC<SidebarBlockModalProps> = ({ ...props }) => {
  const theme: ThemeType = useTheme();
  const { handleAddingAsset } = useContext(FileTreeContext);
  const modalData =
    props.type === FILETREE_TYPES.FOLDER
      ? FolderData
      : props.type === FILETREE_TYPES.BINDER
      ? BinderData
      : StudySetData;

  const handleAddItem = () => {
    props.handleBlockModal();
    props.type === FILETREE_TYPES.FOLDER
      ? handleAddingAsset(FILETREE_TYPES.BINDER, props.id)
      : handleAddingAsset(FILETREE_TYPES.STUDY_SET, props.id);
  };

  const handleDelete = () => {
    props.handleBlockModal();
  };

  const handleRename = () => {
    props.handleBlockModal();
  };
  const handleRecolor = () => {
    props.handleBlockModal();
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
            <HorizontalFlexContainer padding="8px 16px">
              <IconWrapper>{item.icon}</IconWrapper>
              <Spacer width={theme.spacers.size8} />
              <Text>{item.action}</Text>
            </HorizontalFlexContainer>
          </HoverCard>
        );
      })}
    </ShadowCard>
  );
};

export default SidebarBlockModal;
