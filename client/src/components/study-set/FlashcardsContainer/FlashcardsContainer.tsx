import React from "react";
import { Flashcard } from "..";
import { VFlex } from "../../common";

interface FlashcardContainerProps {}

const FlashcardContainer: React.FC<FlashcardContainerProps> = () => {
  return (
    <VFlex>
      <Flashcard />
    </VFlex>
  );
};

export default FlashcardContainer;
