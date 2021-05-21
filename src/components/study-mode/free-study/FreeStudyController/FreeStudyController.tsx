import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { ROTATE, SingleChevronIcon } from "../../../../assets";
import FlipIcon from "../../../../assets/icons/FlipIcon";
import { SIZES } from "../../../../shared";
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

  return (
    <HFlex justifyContent="center">
      <IconActive
        isDisabled={flashcardIndex === 0}
        handleClick={() => setFlashcardIndex((prevState) => prevState - 1)}
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
        handleClick={() => setFlashcardIndex((prevState) => prevState + 1)}
      >
        <SingleChevronIcon size={SIZES.XLARGE} />
      </IconActive>
    </HFlex>
  );
};

export default FreeStudyController;
