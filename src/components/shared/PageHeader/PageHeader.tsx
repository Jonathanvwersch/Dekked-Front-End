import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { Button, HFlex, Spacer, VFlex, Text, EditableText } from "../../common";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { BUTTON_THEME, Params, TAB_TYPE } from "../../../shared";
import { StudyModeModal } from "../../study-mode";
import { usePageSetupHelpers } from "../../../hooks";
import { useIntl } from "react-intl";

interface PageHeaderProps {
  message?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ message }) => {
  const intl = useIntl();
  const [studyMode, setStudyMode] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { theme, formatMessage } = usePageSetupHelpers(ThemeContext, intl);
  const { selectedBlockName, id } = useContext(SelectedItemContext);
  const { tab } = useParams<Params>();

  return (
    <>
      <VFlex>
        <StyledEditableText
          itemId={id}
          editableTextRef={headerRef}
          name={selectedBlockName}
        />
        <Spacer height={theme.spacers.size16} />
        <HFlex justifyContent="space-between">
          <Text fontColor={theme.colors.grey1}>{message}</Text>
          <HFlex width="auto">
            {tab === TAB_TYPE.FLASHCARDS ? (
              <Button buttonStyle={BUTTON_THEME.SECONDARY}>
                {formatMessage("studySet.flashcards.addFlashcard")}
              </Button>
            ) : null}
            <Spacer width={theme.spacers.size16} />
            <Button
              buttonStyle={BUTTON_THEME.PRIMARY}
              handleClick={() => setStudyMode(true)}
            >
              {formatMessage("generics.study")}
            </Button>
          </HFlex>
        </HFlex>
        <Spacer height={theme.spacers.size32} />
      </VFlex>
      {studyMode ? (
        <StudyModeModal
          isOpen={studyMode}
          handleClose={() => setStudyMode(false)}
        />
      ) : null}
    </>
  );
};

const StyledEditableText = styled((props) => <EditableText {...props} />)`
  font-size: ${({ theme }) => theme.typography.fontSizes.size48};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.lineHeightSmall};
  &:empty:before {
    color: ${({ theme }) => theme.colors.grey2};
    z-index: 1000;
  }
`;

export default PageHeader;
