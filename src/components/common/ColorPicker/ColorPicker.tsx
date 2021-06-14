// Colour picker taken from https://casesandberg.github.io/react-color/
import { EditorState } from "draft-js";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { BlockPicker, HSLColor, RGBColor } from "react-color";
import styled, { ThemeContext } from "styled-components";
import { Overlay } from "..";
import { DarkThemeContext, LayeredModalContext } from "../../../contexts";
import {
  LIGHT_THEME_BACKGROUND_COLORS,
  CoordsType,
  LIGHT_THEME_FONT_COLORS,
  MODAL_TYPE,
  SIZES,
  TEXT_STYLES,
  DARK_THEME_FONT_COLORS,
  DARK_THEME_BACKGROUND_COLORS,
} from "../../../shared";
import { toggleInlineStyle } from "../../notetaking/Editor/Editor.helpers";

interface ColorPickerProps {
  isOpen: boolean;
  handleClose: () => void;
  coords: CoordsType | undefined;
  editorState?: EditorState;
  setEditorState?: React.Dispatch<React.SetStateAction<EditorState>>;
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
  editorState,
  setEditorState,
  setIconColor,
  colorPickerRef,
  purpose = "color-block",
}) => {
  const [colour, setColour] = useState<{
    background: string | HSLColor | RGBColor | undefined;
  }>({
    background: iconColor,
  });
  const { setIsLayeredModalOpen } = useContext(LayeredModalContext);
  const { isDarkTheme } = useContext(DarkThemeContext);

  useEffect(() => {
    setIsLayeredModalOpen(true);
    !isOpen && setIsLayeredModalOpen(false);
  }, [isOpen]);

  const theme = useContext(ThemeContext);

  const handleChange = (colour: any) => {
    setColour({ background: colour });
    setIconColor && setIconColor(colour.hex);

    // Toggle font color change in study set toolbar
    purpose === "color-font" &&
      editorState &&
      setEditorState &&
      setEditorState(
        toggleInlineStyle(
          editorState,
          TEXT_STYLES[
            `FONT_COLOR_${colour.hex.slice(1).toUpperCase()}` as TEXT_STYLES
          ],
          [
            ...Object.keys(
              isDarkTheme ? DARK_THEME_FONT_COLORS : LIGHT_THEME_FONT_COLORS
            ),
          ]
        )
      );

    // Toggle background color change in study set toolbar
    purpose === "color-background" &&
      editorState &&
      setEditorState &&
      setEditorState(
        toggleInlineStyle(
          editorState,
          TEXT_STYLES[
            `BACKGROUND_COLOR_${colour.hex
              .slice(1)
              .toUpperCase()}` as TEXT_STYLES
          ],
          [
            ...Object.keys(
              isDarkTheme
                ? DARK_THEME_BACKGROUND_COLORS
                : LIGHT_THEME_BACKGROUND_COLORS
            ),
          ]
        )
      );
  };

  const backgroundColors = [
    theme.colors.colorPicker.background.default,
    theme.colors.colorPicker.background.red,
    theme.colors.colorPicker.background.orange,
    theme.colors.colorPicker.background.yellow,
    theme.colors.colorPicker.background.green,
    theme.colors.colorPicker.background.blue,
    theme.colors.colorPicker.background.indigo,
    theme.colors.colorPicker.background.violet,
    theme.colors.colorPicker.background.grey,
    theme.colors.colorPicker.background.brown,
  ];

  const textAndIconColors = [
    theme.colors.colorPicker.text.default,
    theme.colors.colorPicker.text.primary,
    theme.colors.colorPicker.text.red,
    theme.colors.colorPicker.text.orange,
    theme.colors.colorPicker.text.yellow,
    theme.colors.colorPicker.text.green,
    theme.colors.colorPicker.text.blue,
    theme.colors.colorPicker.text.indigo,
    theme.colors.colorPicker.text.violet,
    theme.colors.colorPicker.text.grey,
  ];

  const defaultColor =
    purpose === "color-block" || purpose === "color-font"
      ? theme.colors.colorPicker.text.default
      : theme.colors.colorPicker.background.default;

  return (
    <Overlay
      isOpen={isOpen}
      handleClose={handleClose}
      coords={coords}
      type={MODAL_TYPE.MODAL_NON_LIGHTBOX}
    >
      <StyledColorPicker
        defaultColor={defaultColor}
        onClick={(e: any) => e.preventDefault()}
        ref={colorPickerRef}
      >
        <BlockPicker
          color={colour.background}
          onChange={handleChange}
          triangle="hide"
          colors={
            purpose === "color-block" || purpose === "color-font"
              ? textAndIconColors
              : backgroundColors
          }
          className="colors"
        />
      </StyledColorPicker>
    </Overlay>
  );
};

const StyledColorPicker = styled.div<{ defaultColor: string }>`
  border-radius: ${({ theme }) => `${theme.sizes.borderRadius[SIZES.MEDIUM]}`};
  box-shadow: ${({ theme }) => `${theme.boxShadow}`};

  & div {
    color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
    box-shadow: none !important;
    border-radius: ${({ theme }) =>
      `0 0 ${theme.sizes.borderRadius[SIZES.MEDIUM]} ${
        theme.sizes.borderRadius[SIZES.MEDIUM]
      }`};
    user-select: none;
    background-color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  }

  & div:nth-child(1) {
    color: transparent !important;
    background-color: transparent;
  }

  & div:nth-child(3) {
    & div:nth-child(2) {
      background-color: ${({ theme }) =>
        theme.colors.backgrounds.pageBackground}!important;
    }

    & input {
      color: ${({ theme }) => `${theme.colors.fontColor} !important`};
      background-color: ${({ theme }) =>
        theme.colors.backgrounds.pageBackground};

      border-radius: ${({ theme }) =>
        `${theme.sizes.borderRadius[SIZES.MEDIUM]} !important`};
      box-shadow: none !important;
      border: 1px solid ${({ theme }) => `${theme.colors.grey2}!important`};
      &:focus {
        border: 1px solid ${({ theme }) => theme.colors.primary}!important;
      }
    }
  }
`;

export default React.memo(ColorPicker);
