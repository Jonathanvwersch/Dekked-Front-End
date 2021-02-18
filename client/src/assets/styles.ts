import { ThemeType } from "../theme";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme: ThemeType) => ({
  icon: ({ rotate, active }) => ({
    transform: `${rotate}`,
    cursor: active ? "pointer" : null,
    "&:hover": {
      "& path": {
        fill: active ? `${theme.colours.primaryHover}` : null,
      },
    },
  }),
}));
