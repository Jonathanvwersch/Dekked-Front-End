import React, { useState } from "react";
import styled from "styled-components";
import { Flashcard } from "..";
import { LogoIcon } from "../../../assets";
import { SIZES } from "../../../shared";
import { VFlex, IconActive } from "../../common";
import { FILL_TYPE } from "../../common/IconActive/IconActive";

interface LinkedFlashcardProps {
  flashcardSize: number;
  flashcardPosition: number;
}

const LinkedFlashcard: React.FC<LinkedFlashcardProps> = ({
  flashcardSize,
  flashcardPosition,
}) => {
  const [showFlashcard, setShowFlashcard] = useState<boolean>(false);

  return (
    <LinkedCard
      flashcardSize={flashcardSize}
      flashcardPosition={flashcardPosition}
    >
      <Tab
        handleClick={() => setShowFlashcard((prevState) => !prevState)}
        fillType={FILL_TYPE.STROKE}
      >
        <LogoIcon size={SIZES.MEDIUM} />
      </Tab>
      {showFlashcard ? <Flashcard linked={true} /> : null}
    </LinkedCard>
  );
};

const LinkedCard = styled(VFlex)<LinkedFlashcardProps>`
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
    `${theme.display.borderRadiusFive} ${theme.display.borderRadiusFive} 0px 0px`};
  padding: ${({ theme }) => `${theme.spacers.size8} ${theme.spacers.size64}`};
`;

export default LinkedFlashcard;
