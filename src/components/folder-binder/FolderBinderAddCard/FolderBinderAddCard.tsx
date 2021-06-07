import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { PlusIcon } from "../../../assets";
import { FileTreeContext, SidebarContext } from "../../../contexts";
import { FILETREE_TYPES, SIZES } from "../../../shared";
import { ThemeType } from "../../../styles/theme";
import { IconActive } from "../../common";

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
    <StyledIconActive
      handleMouseDown={handleAddItem}
      ariaLabel={ariaText()}
      backgroundColor={theme.colors.secondary}
    >
      <PlusIcon size={theme.spacers.size80} />
    </StyledIconActive>
  );
};

const StyledIconActive = styled(IconActive)`
  width: 160px;
  height: 180px;
  border-radius: ${({ theme }) =>
    theme.sizes.borderRadius[SIZES.MEDIUM]}!important;

  &:focus,
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }

  &:active {
    box-shadow: none;
  }
`;

export default FolderBinderAddCard;
