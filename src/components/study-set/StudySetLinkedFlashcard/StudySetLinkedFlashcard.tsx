import React, { useContext, useState } from "react";
import styled from "styled-components/macro";
import { StudySetFlashcard } from "..";
import { LogoIcon } from "../../../assets";
import { EditorContext } from "../../../contexts";
import { useFlashcards } from "../../../services/file-structure";
import { SIZES } from "../../../shared";
import { VFlex, IconActive, Tooltip } from "../../common";
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
  const { currentBlockKey } = useContext(EditorContext);

  return (
    <LinkedCard
      flashcardSize={flashcardSize}
      flashcardPosition={flashcardPosition}
    >
      <Tooltip
        id="LinkedFlashcard"
        text={
          showFlashcard
            ? "generics.clickToMinimise"
            : "tooltips.studySet.flashcards.createLinkedFlashcard"
        }
        place="top"
      >
        <Tab
          handleClick={() => setShowFlashcard((prevState) => !prevState)}
          fillType={FILL_TYPE.STROKE}
        >
          <LogoIcon size={SIZES.MEDIUM} />
        </Tab>
      </Tooltip>
      {showFlashcard ? (
        <StudySetFlashcard linked={true} currentBlockKey={currentBlockKey} />
      ) : null}
    </LinkedCard>
  );
};

const LinkedCard = styled(VFlex)<StudySetLinkedFlashcardProps>`
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
