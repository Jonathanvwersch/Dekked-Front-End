import React, { useContext, useState } from "react";
import styled from "styled-components/macro";
import { StudySetFlashcard } from "..";
import { LogoIcon } from "../../../assets";
import { CurrentBlockContext, SelectedItemContext } from "../../../contexts";
import { SIZES } from "../../../shared";
import { Flex, IconActive, Tooltip } from "../../common";
import { FILL_TYPE } from "../../common/IconActive/IconActive";

interface StudySetLinkedFlashcardProps {
  flashcardSize: number;
  flashcardPosition: number;
}

const StudySetLinkedFlashcard: React.FC<StudySetLinkedFlashcardProps> = ({
  flashcardSize,
  flashcardPosition,
}) => {
  const [showFlashcard, setShowFlashcard] = useState<boolean>(false);
  const { currentBlock } = useContext(CurrentBlockContext);
  const { selectedItemData } = useContext(SelectedItemContext);

  return (
    <LinkedCard
      flexDirection="column"
      flashcardSize={flashcardSize}
      flashcardPosition={flashcardPosition}
    >
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
          handleMouseDown={() => setShowFlashcard((prevState) => !prevState)}
          fillType={FILL_TYPE.STROKE}
        >
          <LogoIcon size={SIZES.MEDIUM} />
        </Tab>
      </Tooltip>
      {showFlashcard ? (
        <StudySetFlashcard
          ownerId={selectedItemData?.owner_id}
          studyPackId={selectedItemData?.id}
          linked={true}
          currentBlockKey={currentBlock?.key}
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
