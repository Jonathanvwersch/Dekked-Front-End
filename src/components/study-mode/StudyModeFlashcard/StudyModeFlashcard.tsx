import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import { HFlex, IconActive, ShadowCard } from "../../common";
import { SIZES } from "../../../shared";
import StudyModeToolbar from "../StudyModeToolbar/StudyModeToolbar";
import { LogoIcon } from "../../../assets";
import { FILL_TYPE } from "../../common/IconActive/IconActive";

interface StudySetFlashcardProps {
  frontText?: string;
  backText?: string;
  linked?: boolean;
}

const StudySetFlashcard: React.FC<StudySetFlashcardProps> = () => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <FlashcardContainer>
        <Flashcard
          padding={`${theme.spacers.size48} ${theme.spacers.size32}`}
          borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
          height="600px"
        ></Flashcard>
        <LogoIconContainer fillType={FILL_TYPE.STROKE}>
          <LogoIcon size={SIZES.LARGE} />
        </LogoIconContainer>
        <StudyModeToolbar />
      </FlashcardContainer>
    </>
  );
};

const Flashcard = styled(ShadowCard)`
  z-index: 0;
`;

const FlashcardContainer = styled(HFlex)`
  justify-content: center;
  position: relative;
`;

const LogoIconContainer = styled(IconActive)`
  position: absolute;
  bottom: 16px;
  z-index: 1;
`;

export default StudySetFlashcard;
