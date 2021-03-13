import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { VFlex } from "..";
import { LogoIcon } from "../../assets";
import { ThemeType } from "../../styles/theme";
import Flashcard from "../Flashcard/Flashcard";
import IconActive, { FILL_TYPE } from "../IconActive/IconActive";

interface LinkedFlashcardProps {
  flashcardSize: number;
}

const LinkedFlashcard: React.FC<LinkedFlashcardProps> = ({ flashcardSize }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const [showFlashcard, setShowFlashcard] = useState<boolean>(false);

  return (
    <LinkedCard flashcardSize={flashcardSize}>
      <Tab
        handleClick={() => setShowFlashcard((prevState) => !prevState)}
        fillType={FILL_TYPE.STROKE}
      >
        <LogoIcon size="20px" />
      </Tab>
      {showFlashcard ? <Flashcard linked={true} /> : null}
    </LinkedCard>
  );
};

const LinkedCard = styled(VFlex)<LinkedFlashcardProps>`
  position: fixed;
  bottom: 0;
  width: ${({ flashcardSize }) => flashcardSize}px;
`;

const Tab = styled(IconActive)`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) =>
    `${theme.display.borderRadiusFive} ${theme.display.borderRadiusFive} 0px 0px`};
  padding: ${({ theme }) => `${theme.spacers.size8} ${theme.spacers.size64}`};
`;

export default LinkedFlashcard;
