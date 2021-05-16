import React, { useContext, useRef, useState } from "react";
import {
  ColorPicker,
  IconActive,
  IconWrapper,
  Spacer,
  Tooltip,
} from "../../common";
import { ReColorIcon, TextColorIcon } from "../../../assets";
import { ThemeContext } from "styled-components/macro";
import { CoordsType, SIZES } from "../../../shared";
import { positionModals } from "../../../helpers";
import { EditorState } from "draft-js";

interface ChangeTextStyleProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const ChangeTextColor: React.FC<ChangeTextStyleProps> = ({
  editorState,
  setEditorState,
}) => {
  const theme = useContext(ThemeContext);
  const [colorPickerFont, setColorPickerFont] = useState<boolean>(false);
  const [colorPickerBackground, setColorPickerBackground] =
    useState<boolean>(false);
  const [coords, setCoords] = useState<CoordsType>();
  const fontColorRef = useRef<HTMLButtonElement>(null);
  const backgroundColorRef = useRef<HTMLButtonElement>(null);

  const handleColorPickerFont = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setColorPickerFont(true);
    setCoords(positionModals(e, undefined, fontColorRef));
  };

  const handleColorPickerBackground = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setColorPickerBackground(true);
    setCoords(positionModals(e, undefined, backgroundColorRef));
  };

  return (
    <>
      <IconWrapper>
        <IconActive
          iconActiveRef={fontColorRef}
          handleMouseDown={(e) => {
            handleColorPickerFont(e);
          }}
        >
          <Tooltip
            id="ChangeTextColour"
            text="tooltips.studySet.toolbar.changeTextColour"
          >
            <TextColorIcon size={SIZES.MEDIUM} />
          </Tooltip>
        </IconActive>
      </IconWrapper>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        iconActiveRef={backgroundColorRef}
        handleMouseDown={(e) => {
          handleColorPickerBackground(e);
        }}
      >
        <Tooltip
          id="ChangeBackgroundColour"
          text="tooltips.studySet.toolbar.highlight"
        >
          <ReColorIcon size={SIZES.MEDIUM} />
        </Tooltip>
      </IconActive>
      <ColorPicker
        isOpen={colorPickerFont}
        handleClose={() => setColorPickerFont(false)}
        coords={coords}
        purpose="color-font"
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <ColorPicker
        isOpen={colorPickerBackground}
        handleClose={() => setColorPickerBackground(false)}
        coords={coords}
        purpose="color-background"
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </>
  );
};

export default ChangeTextColor;
