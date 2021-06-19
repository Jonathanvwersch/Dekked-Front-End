import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Flex,
  Spacer,
  Text,
  EditableText,
  Tooltip,
} from "../../common";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { BUTTON_THEME, FILETREE_TYPES, Params } from "../../../shared";
import { StudyModeModal } from "../../study-mode";
import { useMultiKeyPress, usePageSetupHelpers } from "../../../hooks";
import { FlashcardsContext } from "../../../contexts";
import { useParams } from "react-router-dom";
import { typeAtom } from "../../../store";
import { useAtom } from "jotai";

interface PageHeaderProps {
  message?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ message }) => {
  const [studyMode, setStudyMode] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { theme, formatMessage } = usePageSetupHelpers();
  const { id } = useParams<Params>();
  const [type] = useAtom(typeAtom);
  const { selectedBlockName } = useContext(SelectedItemContext);
  const { flashcards } = useContext(FlashcardsContext);
  const flashcardsDoNotExist = flashcards?.length === 0;

  useMultiKeyPress(
    ["Control", "2"],
    () => !flashcardsDoNotExist && setStudyMode(true)
  );

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
                <Tooltip
                  id="DisabledStudyButton"
                  text="tooltips.studyMode.disabledStudyButton"
                  isActive={flashcardsDoNotExist}
                >
                  <Button
                    buttonStyle={BUTTON_THEME.PRIMARY}
                    handleClick={() => setStudyMode(true)}
                    isDisabled={flashcardsDoNotExist}
                  >
                    {formatMessage("generics.study")}
                  </Button>
                </Tooltip>
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
