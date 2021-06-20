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
import { BUTTON_THEME, FILETREE_TYPES, Params } from "../../../shared";
import { StudyModeModal } from "../../study-mode";
import { useMultiKeyPress, usePageSetupHelpers } from "../../../hooks";
import { FlashcardsContext } from "../../../contexts";
import { useParams } from "react-router-dom";
import { isAppLoadingAtom, typeAtom } from "../../../store";
import { useAtom } from "jotai";
import { useGetAsset } from "../../../helpers";
import Skeleton from "react-loading-skeleton";

interface PageHeaderProps {
  message?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ message }) => {
  const [studyMode, setStudyMode] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { theme, formatMessage } = usePageSetupHelpers();
  const { id } = useParams<Params>();
  const [type] = useAtom(typeAtom);
  const { flashcards } = useContext(FlashcardsContext);
  const flashcardsDoNotExist = flashcards?.length === 0;
  const [isLoading] = useAtom(isAppLoadingAtom);
  const { getAsset } = useGetAsset();

  useMultiKeyPress(
    ["Control", "2"],
    () => !flashcardsDoNotExist && setStudyMode(true)
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
              name={getAsset(type, id)?.name}
            />
          ) : (
            <Skeleton width="400px" height="66px" />
          )}
          <Spacer height={theme.spacers.size16} />
          <Flex justifyContent="space-between">
            {!isLoading ? (
              <Text fontColor={theme.colors.grey1}>{message}</Text>
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
            ) : (
              <Skeleton width="70px" height="32px" />
            )}
          </Flex>
          <Spacer height={theme.spacers.size32} />
          <StudyModeModal
            isOpen={studyMode}
            handleClose={() => setStudyMode(false)}
          />
        </>
      </Flex>
    </>
  );
};

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.spacers.size48};
`;

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
