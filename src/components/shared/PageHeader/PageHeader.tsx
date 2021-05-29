import React, { ReactElement, useContext, useRef, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Flex,
  Spacer,
  Text,
  EditableText,
  ConditionalWrapper,
  Tooltip,
} from "../../common";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { BUTTON_THEME, FILETREE_TYPES } from "../../../shared";
import { StudyModeModal } from "../../study-mode";
import { usePageSetupHelpers } from "../../../hooks";
import { FlashcardsContext } from "../../../contexts";

interface PageHeaderProps {
  message?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ message }) => {
  const [studyMode, setStudyMode] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { theme, formatMessage } = usePageSetupHelpers();
  const { selectedBlockName, type, id } = useContext(SelectedItemContext);
  const { flashcards } = useContext(FlashcardsContext);

  return (
    <>
      <Flex flexDirection="column">
        <StyledEditableText
          itemId={id}
          editableTextRef={headerRef}
          name={selectedBlockName}
        />
        <Spacer height={theme.spacers.size16} />
        <Flex justifyContent="space-between">
          <Text fontColor={theme.colors.grey1}>{message}</Text>
          <Flex width="auto">
            {type === FILETREE_TYPES.STUDY_SET ? (
              <>
                <Spacer width={theme.spacers.size16} />
                <ConditionalWrapper
                  condition={flashcards?.length === 0}
                  wrapper={(children: ReactElement) => (
                    <Tooltip
                      id="DisabledStudyButton"
                      text={formatMessage(
                        "tooltips.studyMode.disabledStudyButton"
                      )}
                    >
                      {children}
                    </Tooltip>
                  )}
                >
                  <Button
                    buttonStyle={BUTTON_THEME.PRIMARY}
                    handleClick={() => setStudyMode(true)}
                    disabled={flashcards?.length === 0}
                  >
                    {formatMessage("generics.study")}
                  </Button>
                </ConditionalWrapper>
              </>
            ) : null}
          </Flex>
        </Flex>
        <Spacer height={theme.spacers.size32} />
      </Flex>
      <StudyModeModal
        isOpen={studyMode}
        handleClose={() => setStudyMode(false)}
      />
    </>
  );
};

const StyledEditableText = styled((props) => <EditableText {...props} />)`
  font-size: ${({ theme }) => theme.typography.fontSizes.size48};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.lineHeightSmall};
  color: ${({ theme }) => theme.colors.fontColor};
  &:empty:before {
    color: ${({ theme }) => theme.colors.grey2};
    z-index: 1000;
  }
`;

export default PageHeader;
