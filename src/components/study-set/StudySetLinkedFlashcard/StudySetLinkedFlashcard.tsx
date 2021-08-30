import { useAtom } from "jotai";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { StudySetFlashcard } from "..";
import { LogoIcon, Flex, IconActive, FILL_TYPE } from "dekked-design-system";
import { useMultiKeyPress } from "../../../hooks";
import { SIZES } from "../../../shared";
import { currentBlockAtom, isAppLoadingAtom } from "../../../store";
import Skeleton from "react-loading-skeleton";
import { Tooltip } from "../../common";

interface StudySetLinkedFlashcardProps {
  flashcardSize: number;
  flashcardPosition: number;
}

const StudySetLinkedFlashcard: React.FC<StudySetLinkedFlashcardProps> = ({
  flashcardSize,
  flashcardPosition,
}) => {
  const [showFlashcard, setShowFlashcard] = useState<boolean>(false);
  const [currentBlock] = useAtom(currentBlockAtom);
  useMultiKeyPress(["Control", "1"], () =>
    setShowFlashcard((prevState) => !prevState)
  );
  const [isLoading] = useAtom(isAppLoadingAtom);
  const show = useCallback(() => {
    setShowFlashcard((prevState) => !prevState);
  }, []);

  const memoChildren = useMemo(() => <LogoIcon />, []);

  return (
    <LinkedCard
      flexDirection="column"
      flashcardSize={flashcardSize}
      flashcardPosition={flashcardPosition}
    >
      {!isLoading ? (
        <Tooltip
          id="LinkedFlashcard"
          text={
            showFlashcard
              ? "generics.clickToMinimise"
              : !currentBlock?.hasFocus
              ? "tooltips.studySet.flashcards.enableLinking"
              : "tooltips.studySet.flashcards.createLinkedFlashcard"
          }
          place="top"
        >
          <Tab
            tabIndex={1}
            isDisabled={!currentBlock?.hasFocus && !showFlashcard}
            handleMouseDown={show}
            fillType={FILL_TYPE.FILL}
          >
            {memoChildren}
          </Tab>
        </Tooltip>
      ) : (
        <Skeleton height="36px" width="148px" />
      )}

      {showFlashcard ? (
        <StudySetFlashcard
          linked={showFlashcard}
          currentBlockKey={currentBlock?.key}
          type="add"
          width="100%"
        />
      ) : null}
    </LinkedCard>
  );
};

const LinkedCard = styled(Flex)<StudySetLinkedFlashcardProps>`
  z-index: 998;
  position: fixed;
  bottom: 0;
  left: ${({ flashcardPosition }) =>
    flashcardPosition ? `${flashcardPosition}px` : "auto"};
  width: ${({ flashcardSize }) => flashcardSize}px;
`;

const Tab = styled(IconActive)`
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) =>
    `${theme.sizes.borderRadius[SIZES.MEDIUM]} ${
      theme.sizes.borderRadius[SIZES.MEDIUM]
    } 0px 0px`};
  padding: ${({ theme }) => `${theme.spacers.size8} ${theme.spacers.size64}`};
  z-index: 10;
`;

export default React.memo(StudySetLinkedFlashcard);
