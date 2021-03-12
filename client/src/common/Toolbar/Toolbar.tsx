import React, { useState } from "react";
import { BlockOptionsModal, HFlex, IconActive, Spacer, Overlay } from "..";
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
} from "../../assets";
import { ROTATE } from "../../assets/types";
import { positionModals } from "../../helpers";
import { CoordsProps } from "../../helpers/positionModals";

interface ToolbarProps {
  toolbarFull?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ toolbarFull = true }) => {
  const [blockOptions, setBlockOptions] = useState<boolean>(false);
  const [coords, setCoords] = useState<CoordsProps>();

  const handleBlockModal = (e: MouseEvent) => {
    setBlockOptions(true);
    // I hate having to hard code the height of the modal but I'm not sure how to get the height of a component before it has been rendered
    const blockModalHeight = 192;
    setCoords(positionModals(e, blockModalHeight));
  };

  return (
    <>
      <HFlex width="auto">
        <IconActive handleClick={(e: MouseEvent) => handleBlockModal(e)}>
          <HFlex>
            <BodyTextIcon />
            <DropDownArrowIcon rotate={ROTATE.NINETY} />
          </HFlex>
        </IconActive>
        <Spacer width="8px" />
        <IconActive>
          <BoldIcon />
        </IconActive>
        <Spacer width="8px" />
        <IconActive>
          <ItalicsIcon />
        </IconActive>
        <Spacer width="8px" />
        <IconActive>
          <UnderlineIcon />
        </IconActive>

        {toolbarFull ? (
          <>
            <Spacer width="8px" />
            <DividerIcon />
            <Spacer width="8px" />
            <IconActive>
              <LeftAlignIcon />
            </IconActive>
            <Spacer width="8px" />
            <IconActive>
              <CenterAlignIcon />
            </IconActive>
            <Spacer width="8px" />
            <IconActive>
              <RightAlignIcon />
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
