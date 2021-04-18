import React from "react";
import { ROTATE, SingleChevronIcon } from "../../../../assets";
import FlipIcon from "../../../../assets/icons/FlipIcon";
import { usePageSetupHelpers } from "../../../../hooks";
import { SIZES } from "../../../../shared";
import { HFlex, IconActive, Spacer, Tooltip } from "../../../common";

interface FreeStudyControllerProps {}

const FreeStudyController: React.FC<FreeStudyControllerProps> = () => {
  const { theme } = usePageSetupHelpers();

  return (
    <HFlex justifyContent="center">
      <IconActive>
        <SingleChevronIcon size={SIZES.LARGE} rotate={ROTATE.ONEEIGHTY} />
      </IconActive>
      <Spacer width={theme.spacers.size64} />
      <Tooltip id="FlipFlashcard" text="tooltips.studyMode.flip" place="top">
        <IconActive>
          <FlipIcon size={SIZES.LARGE} />
        </IconActive>
      </Tooltip>
      <Spacer width={theme.spacers.size64} />
      <IconActive>
        <SingleChevronIcon size={SIZES.LARGE} />
      </IconActive>
    </HFlex>
  );
};

export default FreeStudyController;
