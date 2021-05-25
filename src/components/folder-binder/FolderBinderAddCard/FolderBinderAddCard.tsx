import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { PlusIcon } from "../../../assets";
import { FileTreeContext, SidebarContext } from "../../../contexts";
import { FILETREE_TYPES } from "../../../shared";
import { ThemeType } from "../../../styles/theme";
import { Card, IconActive } from "../../common";

interface FolderBinderAddCardProps {
  type: FILETREE_TYPES;
  id: string;
}

const FolderBinderAddCard: React.FC<FolderBinderAddCardProps> = ({
  type,
  id,
}) => {
  const { addAsset } = useContext(FileTreeContext);
  const theme: ThemeType = useContext(ThemeContext);
  const { handleOpenBlock } = useContext(SidebarContext);

  const handleAddItem = () => {
    handleOpenBlock(id, true);
    if (type === FILETREE_TYPES.FOLDER) {
      addAsset(FILETREE_TYPES.BINDER, id);
    } else addAsset(FILETREE_TYPES.STUDY_SET, id);
  };

  const ariaText = () => {
    if (type === FILETREE_TYPES.FOLDER) {
      return "ariaLabels.addBinder";
    } else return "ariaLabels.addStudySet";
  };

  return (
    <Card height="180px" width="160px" padding="0px">
      <StyledIconActive handleMouseDown={handleAddItem} ariaLabel={ariaText()}>
        <PlusIcon size={theme.spacers.size80} />
      </StyledIconActive>
    </Card>
  );
};

const StyledIconActive = styled(IconActive)`
  width: 100%;
  height: 100%;

  &:focus,
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }

  &:active {
    box-shadow: none;
  }
`;

export default FolderBinderAddCard;
