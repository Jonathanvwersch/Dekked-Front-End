import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import { PlusIcon } from "../../../assets";
import { FileTreeContext } from "../../../contexts";
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
  const { handleAddingAsset } = useContext(FileTreeContext);
  const theme: ThemeType = useContext(ThemeContext);

  const handleAddItem = () => {
    if (type === FILETREE_TYPES.FOLDER) {
      handleAddingAsset(FILETREE_TYPES.BINDER, id);
    } else handleAddingAsset(FILETREE_TYPES.STUDY_SET, id);
  };

  return (
    <Card height="188px" width="170px" padding="0px" ariaLabel="Add item">
      <StyledIconActive handleClick={handleAddItem}>
        <PlusIcon size={theme.spacers.size80} />
      </StyledIconActive>
    </Card>
  );
};

const StyledIconActive = styled(IconActive)`
  width: 100%;
  height: 100%;
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }

  &:active {
    box-shadow: none;
  }
`;

export default FolderBinderAddCard;
