import React, { useState } from "react";
import styled from "styled-components";
import { StudySetFlashcard } from "..";
import { LogoIcon, SingleChevronIcon } from "../../../assets";
import { ROTATE } from "../../../assets/icons/Icon.types";
import { SIZES } from "../../../shared";
import { VFlex, IconActive } from "../../common";
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
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const iconType = () => {
    if (isHovered && showFlashcard) {
      return <SingleChevronIcon size={SIZES.MEDIUM} rotate={ROTATE.NINETY} />;
    } else if (isHovered && !showFlashcard) {
      return (
        <SingleChevronIcon size={SIZES.MEDIUM} rotate={ROTATE.TWOSEVENTY} />
      );
    } else {
      return <LogoIcon size={SIZES.MEDIUM} />;
    }
  };

  return (
    <LinkedCard
      flashcardSize={flashcardSize}
      flashcardPosition={flashcardPosition}
    >
      <Tab
        handleClick={() => setShowFlashcard((prevState) => !prevState)}
        fillType={FILL_TYPE.BOTH}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {iconType()}
      </Tab>
      {showFlashcard ? <StudySetFlashcard linked={true} /> : null}
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
`;

export default StudySetLinkedFlashcard;
