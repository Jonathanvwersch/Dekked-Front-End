import React, { useState } from "react";
import { HFlex, IconActive, Spacer, Overlay } from "../../common";
import {
  BodyTextIcon,
  BoldIcon,
  CenterAlignIcon,
  DropDownArrowIcon,
  ItalicsIcon,
  RightAlignIcon,
  UnderlineIcon,
  LeftAlignIcon,
  DividerIcon,
} from "../../../assets";
import { ROTATE } from "../../../assets/types";
import { positionModals } from "../../../helpers";
import { CoordsProps } from "../../../helpers/positionModals";
import { BlockOptionsModal } from ".";

interface ToolbarProps {
  toolbarFull?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ toolbarFull = true }) => {
  const [blockOptions, setBlockOptions] = useState<boolean>(false);
  const [coords, setCoords] = useState<CoordsProps>();
  const iconSize = "20px";

  const handleBlockModal = (e: MouseEvent) => {
    setBlockOptions(true);
    // I hate having to hard code the height of the modal but I'm not sure how to get the height of a component before it has been rendered
    const blockModalHeight = 193;
    setCoords(positionModals(e, blockModalHeight));
  };

  return (
    <>
      <HFlex width="auto">
        <IconActive handleClick={(e: MouseEvent) => handleBlockModal(e)}>
          <HFlex>
            <BodyTextIcon size={iconSize} />
            <DropDownArrowIcon size={iconSize} rotate={ROTATE.NINETY} />
          </HFlex>
        </IconActive>
        <Spacer width="8px" />
        <IconActive>
          <BoldIcon size={iconSize} />
        </IconActive>
        <Spacer width="8px" />
        <IconActive>
          <ItalicsIcon size={iconSize} />
        </IconActive>
        <Spacer width="8px" />
        <IconActive>
          <UnderlineIcon size={iconSize} />
        </IconActive>

        {toolbarFull ? (
          <>
            <Spacer width="8px" />
            <DividerIcon size={iconSize} />
            <Spacer width="8px" />
            <IconActive>
              <LeftAlignIcon size={iconSize} />
            </IconActive>
            <Spacer width="8px" />
            <IconActive>
              <CenterAlignIcon size={iconSize} />
            </IconActive>
            <Spacer width="8px" />
            <IconActive>
              <RightAlignIcon size={iconSize} />
            </IconActive>
          </>
        ) : null}
      </HFlex>
      <Overlay
        coords={coords}
        state={blockOptions}
        handleState={() => setBlockOptions(false)}
      >
        <BlockOptionsModal
          handleBlockOptionsModal={() => setBlockOptions(false)}
        />
      </Overlay>
    </>
  );
};

export default Toolbar;