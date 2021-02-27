import React from "react";
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
import { BinderData, FolderData, StudySetData } from "./SidebarBlockModal.data";
import { FILETREE_TYPES } from "../../contexts/FileTreeContext";

interface SidebarBlockModalProps {
  type: string;
  id: string;
}

const SidebarBlockModal: React.FC<SidebarBlockModalProps> = ({ ...props }) => {
  const theme: ThemeType = useTheme();
  const modalData =
    props.type === FILETREE_TYPES.FOLDER
      ? FolderData
      : props.type === FILETREE_TYPES.BINDER
      ? BinderData
      : StudySetData;

  return (
    <ShadowCard width="220px">
      {modalData.map((item, index) => {
        return (
          <HoverCard
            backgroundColor={theme.colors.backgrounds.modalBackground}
            key={`SidebarBlockModal ${index}`}
            // handleClick={() => handleAddingAsset(FILETREE_TYPES.BINDER, id)}
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
