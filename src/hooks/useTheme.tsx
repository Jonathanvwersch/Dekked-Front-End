import { ThemeType } from "dekked-design-system";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

function useTheme() {
  const theme: ThemeType = useContext(ThemeContext);
  return theme;
}

export default useTheme;
