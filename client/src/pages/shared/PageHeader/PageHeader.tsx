import React, { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import {
  Button,
  HFlex,
  Spacer,
  VFlex,
  Text,
  EditableText,
} from "../../../common";
import { BUTTON_THEME } from "../../../common/Button/Button";
import { TAB_TYPE } from "../../../contexts/FileTreeContext";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { ThemeType } from "../../../styles/theme";

interface PageHeaderProps {
  message?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ message }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const theme: ThemeType = useContext(ThemeContext);
  const { selectedBlockName } = useContext(SelectedItemContext);
  const { tab } = useParams<{ tab: TAB_TYPE }>();

  return (
    <VFlex>
      <StyledEditableText editableTextRef={headerRef}>
        {selectedBlockName}
      </StyledEditableText>
      <Spacer height="16px" />
      <HFlex justifyContent="space-between">
        <Text fontColor={theme.colors.grey1}>{message}</Text>
        <HFlex width="auto">
          {tab === TAB_TYPE.FLASHCARDS ? (
            <Button buttonStyle={BUTTON_THEME.SECONDARY}>
              + Add flashcard
            </Button>
          ) : null}
          <Spacer width="16px" />
          <Button buttonStyle={BUTTON_THEME.PRIMARY} disabled={true}>
            Study
          </Button>
        </HFlex>
      </HFlex>
      <Spacer height="32px" />
    </VFlex>
  );
};

const StyledEditableText = styled(EditableText)`
  font-size: ${({ theme }) => theme.typography.fontSizes.size54};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.lineHeightSmall};
  &:empty:before {
    color: ${({ theme }) => theme.colors.grey2};
  }
`;

export default PageHeader;
