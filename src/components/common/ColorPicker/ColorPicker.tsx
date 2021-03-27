// Colour picker taken from https://casesandberg.github.io/react-color/
import React, { Dispatch, SetStateAction, useState } from "react";
import { BlockPicker, HSLColor, RGBColor } from "react-color";
import styled from "styled-components";
import { Overlay } from "..";
import { CoordsProps } from "../../../helpers/positionModals";
import { FILETREE_TYPES, SIZES } from "../../../shared";

interface ColorPickerProps {
  state: boolean;
  handleState: () => void;
  coords: CoordsProps;
  iconColor: string;
  setIconColor: Dispatch<SetStateAction<string>>;
  colorPickerRef: React.RefObject<HTMLDivElement>;
  id: string;
  type: FILETREE_TYPES;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  state,
  handleState,
  coords,
  iconColor,
  setIconColor,
  colorPickerRef,
  id,
  type,
}) => {
  const [colour, setColour] = useState<{
    background: string | HSLColor | RGBColor | undefined;
  }>({
    background: iconColor,
  });

  const handleChange = (colour: any) => {
    setColour({ background: colour });
    setIconColor(colour.hex);
  };

  const defaultColors = [
    "#2C2C31",
    "#00B6CE",
    "#E81123",
    "#F7630D",
    "#FABD14",
    "#0F893E",
    "#3971D1",
    "#4B0082",
    "#AC008C",
    "#84939A",
  ];

  return (
    <Overlay state={state} handleState={handleState} coords={coords}>
      <StyledColorPicker
        onClick={(e: any) => e.preventDefault()}
        ref={colorPickerRef}
      >
        <BlockPicker
          color={colour.background}
          onChange={handleChange}
          triangle="hide"
          colors={defaultColors}
          className="colors"
        />
      </StyledColorPicker>
    </Overlay>
  );
};

const StyledColorPicker = styled.div`
  border-radius: ${({ theme }) =>
    `${theme.sizes.borderRadius[SIZES.SMALL]} !important`};
  box-shadow: ${({ theme }) => `${theme.boxShadow} !important`};

  & div {
    color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
    box-shadow: none !important;
    border-radius: ${({ theme }) =>
      `${theme.sizes.borderRadius[SIZES.SMALL]} !important`};
    user-select: none;
  }

  & div:nth-child(1) {
    color: transparent !important;
  }

  & div:nth-child(2) {
    & input {
      color: ${({ theme }) => `${theme.colors.fontColor} !important`};
      border-radius: ${({ theme }) =>
        `${theme.sizes.borderRadius[SIZES.SMALL]} !important`};
      background: ${({ theme }) => `${theme.colors.secondary} !important`};
      box-shadow: none !important;
      border: 1px solid ${({ theme }) => `${theme.colors.grey2}!important`};

      &:focus {
        border: 1px solid ${({ theme }) => theme.colors.primary}!important;
      }
    }
  }
`;

export default ColorPicker;
