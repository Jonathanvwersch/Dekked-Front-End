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
  BinderData,
  FolderData,
  StudySetData,
} from "./SidebarWorkspaceModal.data";
import {
  FileTreeContext,
  FILETREE_TYPES,
} from "../../contexts/FileTreeContext";

interface SidebarWorkspaceModalProps {
  type: string;
  handleModal: () => void;
  id: string;
}

const SidebarWorkspaceModal: React.FC<SidebarWorkspaceModalProps> = ({
  type,
  handleModal,
  id,
}) => {
  const theme: ThemeType = useTheme();
  const modalData =
    type === FILETREE_TYPES.FOLDER
      ? FolderData
      : type === FILETREE_TYPES.BINDER
      ? BinderData
      : StudySetData;
  const { handleAddingAsset } = useContext(FileTreeContext);

  return (
    <ShadowCard width="220px">
      {modalData.map((item, index) => {
        return (
          <HoverCard
            backgroundColor={theme.colors.backgrounds.modalBackground}
            key={`SidebarWorkspaceModal ${index}`}
            handleClick={() => handleAddingAsset(FILETREE_TYPES.BINDER, id)}
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

export default SidebarWorkspaceModal;
