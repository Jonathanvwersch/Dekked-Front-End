import React, { useContext, useRef, useState } from "react";
import { ColorPicker, Tooltip } from "../../common";
import {
  IconActive,
  IconWrapper,
  Spacer,
  ReColorIcon,
  TextColorIcon,
} from "dekked-design-system";
import { ThemeContext } from "styled-components";
import { CoordsType, SIZES } from "../../../shared";
import { positionModals } from "../../../helpers";
import { EditorState } from "draft-js";

interface ChangeTextStyleProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  isDisabled?: boolean;
  iconSize?: SIZES;
  saveEditor?: any;
}

const ChangeTextColor: React.FC<ChangeTextStyleProps> = ({
  editorState,
  setEditorState,
  isDisabled,
  iconSize = SIZES.MEDIUM,
  saveEditor,
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
          isDisabled={isDisabled}
        >
          <Tooltip
            id="ChangeTextColour"
            text="tooltips.studySet.toolbar.changeTextColour"
          >
            <TextColorIcon size={iconSize} />
          </Tooltip>
        </IconActive>
      </IconWrapper>
      <Spacer width={theme.spacers.size4} />
      <IconActive
        iconActiveRef={backgroundColorRef}
        handleMouseDown={(e) => {
          handleColorPickerBackground(e);
        }}
        isDisabled={isDisabled}
      >
        <Tooltip
          id="ChangeBackgroundColour"
          text="tooltips.studySet.toolbar.highlight"
        >
          <ReColorIcon size={iconSize} />
        </Tooltip>
      </IconActive>
      <ColorPicker
        isOpen={colorPickerFont}
        handleClose={() => setColorPickerFont(false)}
        coords={coords}
        variant="color-font"
        editorState={editorState}
        setEditorState={setEditorState}
        saveEditor={saveEditor}
      />
      <ColorPicker
        isOpen={colorPickerBackground}
        handleClose={() => setColorPickerBackground(false)}
        coords={coords}
        variant="color-background"
        editorState={editorState}
        setEditorState={setEditorState}
        saveEditor={saveEditor}
      />
    </>
  );
};

export default ChangeTextColor;
