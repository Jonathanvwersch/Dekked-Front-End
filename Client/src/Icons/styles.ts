import { createUseStyles } from "react-jss";
import { ThemeType } from "../theme";

export const useStyles = createUseStyles((theme: ThemeType) => ({
  colour: theme.colours.offBlack,
  size: theme.icons.size,
}));
