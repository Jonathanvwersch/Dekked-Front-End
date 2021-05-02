// Colour picker taken from https://casesandberg.github.io/react-color/
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { BlockPicker, HSLColor, RGBColor } from "react-color";
import styled, { ThemeContext } from "styled-components/macro";
import { Overlay } from "..";
import { EditorContext } from "../../../contexts";
import {
  BACKGROUND_COLORS,
  CoordsType,
  FONT_COLORS,
  MODAL_TYPE,
  SIZES,
  TEXT_STYLES,
} from "../../../shared";

interface ColorPickerProps {
  isOpen: boolean;
  handleClose: () => void;
  coords: CoordsType | undefined;
  iconColor?: string;
  setIconColor?: Dispatch<SetStateAction<string>>;
  colorPickerRef?: React.RefObject<HTMLDivElement>;
  purpose?: "color-background" | "color-block" | "color-font";
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  isOpen,
  handleClose,
  coords,
  iconColor,
  setIconColor,
  colorPickerRef,
  purpose = "color-block",
}) => {
  const [colour, setColour] = useState<{
    background: string | HSLColor | RGBColor | undefined;
  }>({
    background: iconColor,
  });
  const theme = useContext(ThemeContext);
  const { toggleInlineStyle } = useContext(EditorContext);

  const handleChange = (colour: any) => {
    setColour({ background: colour });
    setIconColor && setIconColor(colour.hex);

    // Toggle font color change in study set toolbar
    purpose === "color-font" &&
      toggleInlineStyle(
        TEXT_STYLES[
          `FONT_COLOR_${colour.hex.slice(1).toUpperCase()}` as TEXT_STYLES
        ],
        [...Object.keys(FONT_COLORS)]
      );

    // Toggle background color change in study set toolbar
    purpose === "color-background" &&
      toggleInlineStyle(
        TEXT_STYLES[
          `BACKGROUND_COLOR_${colour.hex.slice(1).toUpperCase()}` as TEXT_STYLES
        ],
        [...Object.keys(BACKGROUND_COLORS)]
      );
  };

  const defaultGeneralColors = [
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

  const defaultBackgroundColors = [
    `${theme.colors.backgrounds.pageBackground}`,
    "#FBE4E4",
    "#FAEBDD",
    "#FBF3DB",
    "#DDEBF1",
    "#E9E5E3",
    "#DDEDEA",
    "#F4DFEB",
    "#EBECED",
    "#EAE4F2",
  ];

  return (
    <Overlay
      isOpen={isOpen}
      handleClose={handleClose}
      coords={coords}
      type={MODAL_TYPE.MODAL_NON_LIGHTBOX}
    >
      <StyledColorPicker
        onClick={(e: any) => e.preventDefault()}
        ref={colorPickerRef}
      >
        <BlockPicker
          color={colour.background}
          onChange={handleChange}
          triangle="hide"
          colors={
            purpose === "color-block" || purpose === "color-font"
              ? defaultGeneralColors
              : defaultBackgroundColors
          }
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
      box-shadow: none !important;
      border: 1px solid ${({ theme }) => `${theme.colors.grey2}!important`};

      &:focus {
        border: 1px solid ${({ theme }) => theme.colors.primary}!important;
      }
    }
  }
`;

export default React.memo(ColorPicker);
