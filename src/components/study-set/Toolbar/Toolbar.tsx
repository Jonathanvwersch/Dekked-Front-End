import React, { useContext, useState } from "react";
import { HFlex, IconActive, Spacer } from "../../common";
import {
  BodyTextIcon,
  BoldIcon,
  DropDownArrowIcon,
  ItalicsIcon,
  UnderlineIcon,
} from "../../../assets";
import { ROTATE } from "../../../assets/types";
import { positionModals } from "../../../helpers";
import { CoordsProps } from "../../../helpers/positionModals";
import { BlockOptionsModal } from ".";
import { EditorContext } from "../../../contexts/EditorContext";
import { ThemeContext } from "styled-components";
import { ThemeType } from "../../../styles/theme";
import { SIZES } from "../../common/Pages/InsetPage";

interface ToolbarProps {
  toolbarFull?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ toolbarFull = true }) => {
  const [blockOptions, setBlockOptions] = useState<boolean>(false);
  const [coords, setCoords] = useState<CoordsProps>();
  const theme: ThemeType = useContext(ThemeContext);

  const handleBlockModal = (e: MouseEvent) => {
    setBlockOptions(true);
    // I hate having to hard code the height of the modal but I'm not sure how to get the height of a component before it has been rendered
    const blockModalHeight = 193;
    setCoords(positionModals(e, blockModalHeight));
  };

  const { toggleInLineStyle } = useContext(EditorContext);

  return (
    <>
      <HFlex width="auto">
        <IconActive handleClick={(e: MouseEvent) => handleBlockModal(e)}>
          <HFlex>
            <BodyTextIcon size={SIZES.MEDIUM} />
            <DropDownArrowIcon size={SIZES.MEDIUM} rotate={ROTATE.NINETY} />
          </HFlex>
        </IconActive>
        <Spacer width="8px" />
        <IconActive
          handleClick={(e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            toggleInLineStyle("BOLD");
          }}
        >
          <BoldIcon size={SIZES.MEDIUM} />
        </IconActive>
        <Spacer width="8px" />
        <IconActive
          handleClick={(e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            toggleInLineStyle("ITALIC");
          }}
        >
          <ItalicsIcon size={SIZES.MEDIUM} />
        </IconActive>
        <Spacer width="8px" />
        <IconActive
          handleClick={(e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            toggleInLineStyle("UNDERLINE");
          }}
        >
          <UnderlineIcon size={SIZES.MEDIUM} />
        </IconActive>

        {/* {toolbarFull ? (
          <>
            <Spacer width="8px" />
            <DividerIcon size={SIZES.MEDIUM}/>
            <Spacer width="8px" />
            <IconActive>
              <LeftAlignIcon size={SIZES.MEDIUM}/>
            </IconActive>
            <Spacer width="8px" />
            <IconActive>
              <CenterAlignIcon size={SIZES.MEDIUM}/>
            </IconActive>
            <Spacer width="8px" />
            <IconActive>
              <RightAlignIcon size={SIZES.MEDIUM}/>
            </IconActive>
          </>
        ) : null} */}
      </HFlex>
      <BlockOptionsModal
        open={blockOptions}
        handleClose={() => setBlockOptions(false)}
        coords={coords!}
      />
    </>
  );
};

export default Toolbar;
