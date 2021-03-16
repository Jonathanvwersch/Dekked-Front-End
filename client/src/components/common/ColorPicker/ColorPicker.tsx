import React, { Dispatch, SetStateAction, useState } from "react";
import { BlockPicker, HSLColor, RGBColor } from "react-color";
import styled from "styled-components";

// Colour picker taken from https://casesandberg.github.io/react-color/
interface ColorPickerProps {
  iconColor: string;
  setIconColor: Dispatch<SetStateAction<string>>;
  colorPickerRef: React.RefObject<HTMLDivElement>;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  iconColor,
  setIconColor,
  colorPickerRef,
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
    <StyledColorPicker ref={colorPickerRef}>
      <BlockPicker
        color={colour.background}
        onChange={handleChange}
        triangle="hide"
        colors={defaultColors}
        className="colors"
      />
    </StyledColorPicker>
  );
};

const StyledColorPicker = styled.div`
  border-radius: ${({ theme }) =>
    `${theme.display.borderRadiusTwo} !important`};
  box-shadow: ${({ theme }) => `${theme.boxShadow} !important`};

  & div {
    color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
    box-shadow: none !important;
    border-radius: ${({ theme }) =>
      `${theme.display.borderRadiusTwo} !important`};
    user-select: none;
  }

  & div:nth-child(1) {
    color: transparent !important;
  }

  & div:nth-child(2) {
    & input {
      color: ${({ theme }) => `${theme.colors.fontColor} !important`};
      border-radius: ${({ theme }) =>
        `${theme.display.borderRadiusTwo} !important`};
      background: ${({ theme }) => `${theme.colors.secondary} !important`};
      box-shadow: none !important;
      border: ${({ theme }) => `1px solid ${theme.colors.grey2}!important`};
    }
  }
`;

export default ColorPicker;
