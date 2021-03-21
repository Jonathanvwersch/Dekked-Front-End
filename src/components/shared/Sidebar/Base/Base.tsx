import React, { useContext } from "react";
import {
  Divider,
  HFlex,
  HoverCard,
  IconWrapper,
  Spacer,
  Text,
} from "../../../common";
import styled, { ThemeContext } from "styled-components";
import { PlusIcon } from "../../../../assets";
import { FileTreeContext } from "../../../../contexts";
import { ThemeType } from "../../../../styles/theme";
import { FILETREE_TYPES } from "../../../../contexts/FileTreeContext";
import { SIZES } from "../../../common/Pages/InsetPage";

interface BaseProps {}

const Base: React.FC<BaseProps> = () => {
  const theme: ThemeType = useContext(ThemeContext);
  const { handleAddingAsset } = useContext(FileTreeContext);

  return (
    <StyledBase>
      <Divider />
      <HoverCard
        handleClick={() => {
          handleAddingAsset(FILETREE_TYPES.FOLDER);
        }}
        padding="16px"
      >
        <HFlex>
          <IconWrapper>
            <PlusIcon size={SIZES.MEDIUM} />
          </IconWrapper>
          <Spacer width={theme.spacers.size8} />
          <Text fontSize={theme.typography.fontSizes.size16}>Add folder</Text>
        </HFlex>
      </HoverCard>
    </StyledBase>
  );
};

const StyledBase = styled.div`
  z-index: 10;
  margin-top: auto;
  width: 100%;
`;

export default Base;
