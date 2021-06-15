import { EditorState } from "draft-js";
import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useEffect,
} from "react";
import { useIntl } from "react-intl";
import styled, { ThemeContext } from "styled-components";
import { Card, Flex, Overlay, ShadowCard } from "..";
import { TextColorIcon } from "../../../assets";
import { DarkThemeContext, LayeredModalContext } from "../../../contexts";
import { handleIconType, lightenOrDarkenHexColour } from "../../../helpers";
import { formatMessage } from "../../../intl";
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
import Tooltip from "../Tooltip/Tooltip";
import { backgroundColors, textAndIconColors } from "./ColorPicker.data";

interface ColorPickerProps {
  isOpen: boolean;
  handleClose: () => void;
  coords: CoordsType | undefined;
  editorState?: EditorState;
  setEditorState?: React.Dispatch<React.SetStateAction<EditorState>>;
  iconColor?: string;
  setIconColor?: Dispatch<SetStateAction<string>>;
  colorPickerRef?: React.RefObject<HTMLDivElement>;
  variant?: "color-background" | "color-block" | "color-font";
  type?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  isOpen,
  handleClose,
  coords,
  editorState,
  setEditorState,
  setIconColor,
  colorPickerRef,
  variant = "color-block",
  type,
}) => {
  const theme = useContext(ThemeContext);
  const { setIsLayeredModalOpen } = useContext(LayeredModalContext);
  const { isDarkTheme } = useContext(DarkThemeContext);
  const intl = useIntl();

  useEffect(() => {
    setIsLayeredModalOpen(true);
    !isOpen && setIsLayeredModalOpen(false);
  }, [isOpen]);

  const handleClick = (colour: string) => {
    setIconColor && setIconColor(colour);

    if (editorState && setEditorState) {
      // Toggle font color change in study set toolbar
      if (variant === "color-font") {
        setEditorState(
          toggleInlineStyle(
            editorState,
            TEXT_STYLES[
              `FONT_COLOR_${colour.slice(1).toUpperCase()}` as TEXT_STYLES
            ],
            [
              ...Object.keys(
                isDarkTheme ? DARK_THEME_FONT_COLORS : LIGHT_THEME_FONT_COLORS
              ),
            ]
          )
        );
      }
      // Toggle background color change in study set toolbar
      else if (variant === "color-background") {
        setEditorState(
          toggleInlineStyle(
            editorState,
            TEXT_STYLES[
              `BACKGROUND_COLOR_${colour.slice(1).toUpperCase()}` as TEXT_STYLES
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
      }
    }
  };

  const colorArray =
    variant === "color-background"
      ? backgroundColors(theme)
      : textAndIconColors(theme);

  return (
    <Overlay
      isOpen={isOpen}
      handleClose={handleClose}
      coords={coords}
      type={MODAL_TYPE.MODAL_NON_LIGHTBOX}
    >
      <ShadowCard width="132px" cardRef={colorPickerRef}>
        <Flex flexWrap="wrap" width="100%" justifyContent="center">
          {colorArray.map((color) => (
            <Tooltip
              id={formatMessage(color.tooltip, intl)}
              text={color.tooltip}
            >
              <ColorBlock
                backgroundColor={
                  variant === "color-background"
                    ? color.color
                    : theme.colors.backgrounds.pageBackground
                }
                m="8px"
                p="0"
                width="28px"
                height="28px"
                border={`solid 1px ${lightenOrDarkenHexColour(
                  color.color,
                  isDarkTheme ? 40 : -40
                )}`}
                handleClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  handleClick(color.color);
                }}
              >
                {variant !== "color-block" ? (
                  <TextColorIcon
                    size={SIZES.MEDIUM}
                    color={
                      variant === "color-background"
                        ? theme.colors.fontColor
                        : color.color
                    }
                  />
                ) : (
                  type && handleIconType(type, color.color)
                )}
              </ColorBlock>
            </Tooltip>
          ))}
        </Flex>
      </ShadowCard>
    </Overlay>
  );
};

const ColorBlock = styled(Card)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default React.memo(ColorPicker);
