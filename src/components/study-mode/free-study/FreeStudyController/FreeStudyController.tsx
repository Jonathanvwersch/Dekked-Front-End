import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ThemeContext } from "styled-components/macro";
import { ROTATE, SingleChevronIcon } from "../../../../assets";
import FlipIcon from "../../../../assets/icons/FlipIcon";
import { Params, SIZES, STUDY_MODE_TYPES } from "../../../../shared";
import { HFlex, IconActive, Spacer, Tooltip } from "../../../common";

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

  return (
    <HFlex justifyContent="center">
      <IconActive
        isDisabled={flashcardIndex === 0}
        handleClick={() => {
          setFlashcardIndex((prevState) => prevState - 1);
          navigateTo(currentIndex - 1);
        }}
      >
        <SingleChevronIcon size={SIZES.XLARGE} rotate={ROTATE.ONEEIGHTY} />
      </IconActive>

      <Spacer width={theme.spacers.size64} />
      <Tooltip id="FlipFlashcard" text="tooltips.studyMode.flip" place="top">
        <IconActive
          isDisabled={flashcardIndex === maxLength}
          handleClick={() => setFlippedState((prevState) => !prevState)}
        >
          <FlipIcon size={SIZES.XLARGE} />
        </IconActive>
      </Tooltip>
      <Spacer width={theme.spacers.size64} />
      <IconActive
        isDisabled={flashcardIndex === maxLength}
        handleClick={() => {
          setFlashcardIndex((prevState) => prevState + 1);
          navigateTo(currentIndex + 1);
        }}
      >
        <SingleChevronIcon size={SIZES.XLARGE} />
      </IconActive>
    </HFlex>
  );
};

export default FreeStudyController;
