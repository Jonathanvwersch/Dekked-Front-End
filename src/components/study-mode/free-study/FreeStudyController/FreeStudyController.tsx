import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { ROTATE, SingleChevronIcon } from "../../../../assets";
import FlipIcon from "../../../../assets/icons/FlipIcon";
import useKeyPress from "../../../../hooks/useKeyPress";
import { Params, SIZES, STUDY_MODE_TYPES } from "../../../../shared";
import { Flex, IconActive, Spacer, Tooltip } from "../../../common";

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
  const history = useHistory();
  const { type, id } = useParams<Params>();
  const currentIndex = flashcardIndex + 1;
  const navigateTo = (index: number) => {
    const cardIndex = index > maxLength ? "complete" : index;
    history.push(
      `/${type}/${id}/study/${STUDY_MODE_TYPES.FREE_STUDY}/${cardIndex}`
    );
  };

  const arrowLeft = () => {
    if (flashcardIndex !== 0) {
      setFlashcardIndex((prevState) => prevState - 1);
      navigateTo(currentIndex - 1);
    }
  };

  const arrowRight = () => {
    if (flashcardIndex !== maxLength) {
      setFlippedState(true);
      setFlashcardIndex((prevState) => prevState + 1);
      navigateTo(currentIndex + 1);
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
      <IconActive
        backgroundColor={theme.colors.backgrounds.studyModeBackground}
        isDisabled={flashcardIndex === 0}
        handleClick={arrowLeft}
      >
        <SingleChevronIcon size={SIZES.XLARGE} rotate={ROTATE.ONEEIGHTY} />
      </IconActive>
      <Spacer width={theme.spacers.size64} />
      <Tooltip id="FlipFlashcard" text="tooltips.studyMode.flip" place="top">
        <IconActive
          backgroundColor={theme.colors.backgrounds.studyModeBackground}
          isDisabled={flashcardIndex === maxLength}
          handleClick={flipCard}
        >
          <FlipIcon size={SIZES.XLARGE} />
        </IconActive>
      </Tooltip>
      <Spacer width={theme.spacers.size64} />
      <IconActive
        backgroundColor={theme.colors.backgrounds.studyModeBackground}
        isDisabled={flashcardIndex === maxLength}
        handleClick={arrowRight}
      >
        <SingleChevronIcon size={SIZES.XLARGE} />
      </IconActive>
    </Flex>
  );
};

export default FreeStudyController;
