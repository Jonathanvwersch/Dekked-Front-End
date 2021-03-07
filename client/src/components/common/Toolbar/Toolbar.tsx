import React from "react";
import { HFlex, IconActive, Spacer } from "..";
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

interface ToolbarProps {
  toolbarFull?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ toolbarFull = true }) => {
  return (
    <HFlex>
      <IconActive>
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
  );
};

export default Toolbar;
