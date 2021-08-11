import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import {
  ROTATE,
  SingleChevronIcon,
  Flex,
  IconActive,
  Spacer,
  Tooltip,
  FlipIcon,
} from "dekked-design-system";
import useKeyPress from "../../../../hooks/useKeyPress";
import { SIZES } from "../../../../shared";

interface FreeStudyControllerProps {
  maxLength: number;
  flashcardIndex: number;
  setFlashcardIndex: React.Dispatch<React.SetStateAction<number>>;
  setFlippedState: React.Dispatch<React.SetStateAction<boolean>>;
}

const FreeStudyController: React.FC<FreeStudyControllerProps> = ({
  maxLength,
  flashcardIndex,
  setFlashcardIndex,
  setFlippedState,
}) => {
  const theme = useContext(ThemeContext);

  const arrowLeft = () => {
    if (flashcardIndex !== 0) {
      setFlashcardIndex((prevState) => prevState - 1);
    }
  };

  const arrowRight = () => {
    if (flashcardIndex !== maxLength) {
      setFlippedState(true);
      setFlashcardIndex((prevState) => prevState + 1);
    }
  };

  const flipCard = () => {
    if (flashcardIndex !== maxLength) {
      setFlippedState((prevState) => !prevState);
    }
  };

  useKeyPress([" ", "Spacebar"], flipCard);
  useKeyPress(["ArrowRight"], arrowRight);
  useKeyPress(["ArrowLeft"], arrowLeft);

  return (
    <Flex justifyContent="center" mt={theme.spacers.size48}>
      <IconActive isDisabled={flashcardIndex === 0} handleClick={arrowLeft}>
        <SingleChevronIcon size={SIZES.XLARGE} rotate={ROTATE.ONEEIGHTY} />
      </IconActive>
      <Spacer width={theme.spacers.size64} />
      <Tooltip id="FlipFlashcard" text="tooltips.studyMode.flip" place="top">
        <IconActive
          isDisabled={flashcardIndex === maxLength}
          handleClick={flipCard}
        >
          <FlipIcon size={SIZES.XLARGE} />
        </IconActive>
      </Tooltip>
      <Spacer width={theme.spacers.size64} />
      <IconActive
        isDisabled={flashcardIndex === maxLength}
        handleClick={arrowRight}
      >
        <SingleChevronIcon size={SIZES.XLARGE} />
      </IconActive>
    </Flex>
  );
};

export default FreeStudyController;
