import React, { useMemo, useRef } from "react";
import styled from "styled-components";
import { ButtonDropdown, EditableText, Tooltip } from "../../common";
import { FILETREE_TYPES, Params, STUDY_MODE_TYPES } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import { useHistory, useParams } from "react-router-dom";
import {
  currentFlashcardIndexAtom,
  isAppLoadingAtom,
  selectActiveBlockName,
  typeAtom,
} from "../../../store";
import { useAtom } from "jotai";
import Skeleton from "react-loading-skeleton";
import { Flex, Spacer, Text } from "dekked-design-system";
import { studyButtonData } from "./PageHeader.data";

interface PageHeaderProps {
  message?: string;
  disableStudyButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  message,
  disableStudyButton,
}) => {
  const [, setCurrentFlashcardIndex] = useAtom(currentFlashcardIndexAtom);
  const headerRef = useRef<HTMLDivElement>(null);
  const { theme, formatMessage } = usePageSetupHelpers();
  const { id } = useParams<Params>();
  const [type] = useAtom(typeAtom);
  const [isLoading] = useAtom(isAppLoadingAtom);
  const [selectedBlockName] = useAtom(
    useMemo(() => selectActiveBlockName(id, type), [id, type])
  );
  const history = useHistory();

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
                      <ButtonDropdown
                        modal={{
                          clickFunctions: (option: STUDY_MODE_TYPES) => {
                            setCurrentFlashcardIndex(0);
                            if (option === STUDY_MODE_TYPES.FREE_STUDY) {
                              history.push(
                                `/${type}/${id}/study/${STUDY_MODE_TYPES.FREE_STUDY}`
                              );
                            } else if (
                              option === STUDY_MODE_TYPES.SPACED_REPETITION
                            ) {
                              history.push(
                                `/${type}/${id}/study/${STUDY_MODE_TYPES.SPACED_REPETITION}`
                              );
                            }
                          },
                          data: studyButtonData,
                        }}
                        flushWithRightButtonSide
                        button={{
                          text: formatMessage("generics.study"),
                          isDisabled: disableStudyButton,
                        }}
                      />
                    </Tooltip>
                  </>
                ) : null}
              </Flex>
            ) : (
              <Skeleton width="70px" height="32px" />
            )}
          </Flex>
          <Spacer height={theme.spacers.size32} />
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
