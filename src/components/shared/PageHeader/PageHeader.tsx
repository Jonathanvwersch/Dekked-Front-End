import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { EditableText } from "../../common";
import { BUTTON_THEME, FILETREE_TYPES, Params } from "../../../shared";
import { StudyModeModal } from "../../study-mode";
import { useMultiKeyPress, usePageSetupHelpers } from "../../../hooks";
import { useParams } from "react-router-dom";
import {
  currentFlashcardIndexAtom,
  isAppLoadingAtom,
  selectActiveBlockName,
  typeAtom,
} from "../../../store";
import { useAtom } from "jotai";
import Skeleton from "react-loading-skeleton";
import { Button, Flex, Spacer, Text, Tooltip } from "dekked-design-system";

interface PageHeaderProps {
  message?: string;
  disableStudyButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  message,
  disableStudyButton,
}) => {
  const [studyMode, setStudyMode] = useState<boolean>(false);
  const [, setCurrentFlashcardIndex] = useAtom(currentFlashcardIndexAtom);
  const headerRef = useRef<HTMLDivElement>(null);
  const { theme, formatMessage } = usePageSetupHelpers();
  const { id } = useParams<Params>();
  const [type] = useAtom(typeAtom);
  const [isLoading] = useAtom(isAppLoadingAtom);
  const [selectedBlockName] = useAtom(
    useMemo(() => selectActiveBlockName(id, type), [id, type])
  );
  useMultiKeyPress(
    ["Control", "2"],
    () => !disableStudyButton && setStudyMode(true)
  );

  return (
    <>
      <Flex
        flexDirection="column"
        alignItems={isLoading ? "flex-start" : "center"}
      >
        <>
          {!isLoading ? (
            <StyledEditableText
              itemId={id}
              editableTextRef={headerRef}
              name={selectedBlockName}
            />
          ) : (
            <div style={{ width: "100%" }}>
              <Skeleton width="30%" height="66px" />
            </div>
          )}
          <Spacer height={theme.spacers.size16} />
          <Flex justifyContent="space-between">
            {!isLoading ? (
              <Text fontColor={theme.colors.grey1} userSelect="none">
                {message}
              </Text>
            ) : (
              <Skeleton width="45px" height="16px" />
            )}
            {!isLoading ? (
              <Flex width="auto">
                {type === FILETREE_TYPES.STUDY_SET ? (
                  <>
                    <Spacer width={theme.spacers.size16} />
                    <Tooltip
                      id="DisabledStudyButton"
                      text="tooltips.studyMode.disabledStudyButton"
                      isActive={disableStudyButton}
                    >
                      <Button
                        buttonStyle={BUTTON_THEME.PRIMARY}
                        handleClick={() => {
                          setStudyMode(true);
                          setCurrentFlashcardIndex(0);
                        }}
                        isDisabled={disableStudyButton}
                      >
                        {formatMessage("generics.study")}
                      </Button>
                    </Tooltip>
                  </>
                ) : null}
              </Flex>
            ) : (
              <Skeleton width="70px" height="32px" />
            )}
          </Flex>
          <Spacer height={theme.spacers.size32} />
          {studyMode && (
            <StudyModeModal
              isOpen={studyMode}
              handleClose={() => setStudyMode(false)}
            />
          )}
        </>
      </Flex>
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

export default React.memo(PageHeader);
