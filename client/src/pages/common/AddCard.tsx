import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { PlusIcon } from "../../assets";
import {
  FileTreeContext,
  FILETREE_TYPES,
} from "../../contexts/FileTreeContext";
import { ThemeType } from "../../styles/theme";
import { Card, IconActive } from "../../components/common";

interface AddCardProps {
  type: FILETREE_TYPES;
  id: string;
}

const AddCard: React.FC<AddCardProps> = ({ type, id }) => {
  const { handleAddingAsset } = useContext(FileTreeContext);
  const theme: ThemeType = useContext(ThemeContext);

  const handleAddItem = () => {
    if (type === FILETREE_TYPES.FOLDER) {
      handleAddingAsset(FILETREE_TYPES.BINDER, id);
    } else handleAddingAsset(FILETREE_TYPES.STUDY_SET, id);
  };

  return (
    <Card
      borderRadius={theme.display.borderRadiusTwo}
      height="188px"
      width="170px"
      padding="0px"
    >
      <StyledIconActive handleClick={handleAddItem}>
        <PlusIcon size="80px" />
      </StyledIconActive>
    </Card>
  );
};

const StyledIconActive = styled(IconActive)`
  width: 100%;
  height: 100%;
`;

export default AddCard;
