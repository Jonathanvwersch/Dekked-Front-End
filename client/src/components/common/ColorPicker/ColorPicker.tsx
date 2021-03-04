import React, { Dispatch, SetStateAction, useState } from "react";
import { BlockPicker, HSLColor, RGBColor } from "react-color";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";

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
  const classes = useStyles();
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
    <div ref={colorPickerRef} className={classes.colorPicker}>
      <BlockPicker
        color={colour.background}
        onChange={handleChange}
        triangle="hide"
        colors={defaultColors}
      />
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  colorPicker: {
    "& div": {
      color: `${theme.colors.backgrounds.pageBackground}`,
      borderRadius: `${theme.display.borderRadiusTwo} !important`,
      boxShadow: `${theme.boxShadow} !important`,
      userSelect: "none",

      "& div": {
        textTransform: "capitalize !important",
        borderRadius: `${theme.display.borderRadiusTwo} !important`,
        boxShadow: "none !important",
        color: "transparent !important",
      },

      "& input": {
        color: `${theme.colors.fontColor} !important`,
        fontSize: `${theme.typography.fontSizes.size12} !important`,
        borderRadius: `${theme.display.borderRadiusTwo} !important`,
        fontFamily: `${theme.typography.fontFamily} !important`,
        background: `${theme.colors.secondary} !important`,
      },
    },
  },
}));

export default ColorPicker;
