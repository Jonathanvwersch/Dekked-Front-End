import { PlusIcon, ThemeType } from "dekked-design-system";
import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { useAddAsset } from "../../../helpers";
import { FILETREE_TYPES, SIZES } from "../../../shared";

interface FolderBinderAddCardProps {
  type: FILETREE_TYPES;
  id: string;
  folderId: string | undefined;
}

const FolderBinderAddCard: React.FC<FolderBinderAddCardProps> = ({
  type,
  id,
  folderId,
}) => {
  const { addAsset } = useAddAsset();
  const theme: ThemeType = useContext(ThemeContext);

  const handleAddItem = () => {
    if (type === FILETREE_TYPES.FOLDER) {
      addAsset(FILETREE_TYPES.BINDER, id);
    } else addAsset(FILETREE_TYPES.STUDY_SET, folderId, id);
  };

  const ariaText = () => {
    if (type === FILETREE_TYPES.FOLDER) {
      return "ariaLabels.addBinder";
    } else return "ariaLabels.addStudySet";
  };

  return (
    <StyledIconActive
      onMouseDown={handleAddItem}
      aria-label={ariaText()}
      role="button"
    >
      <PlusIcon size={theme.spacers.size80} />
    </StyledIconActive>
  );
};

const StyledIconActive = styled.div`
  width: 160px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  border-radius: ${({ theme }) =>
    theme.sizes.borderRadius[SIZES.MEDIUM]}!important;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
  &:focus,
  &:active {
    box-shadow: none;
  }
`;

export default React.memo(FolderBinderAddCard);
