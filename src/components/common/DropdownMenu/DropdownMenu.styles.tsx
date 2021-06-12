import { SIZES } from "../../../shared";
import { ThemeType } from "../../../styles/theme";

export const customStyles: (theme: ThemeType) => Partial<{}> = (
  theme: ThemeType
) => ({
  input: (styles: any) => ({
    ...styles,
    padding: 0,
    margin: 0,
  }),
  container: (styles: any) => ({
    ...styles,
    fontFamily: theme.typography.fontFamily,
    cursor: "pointer",
  }),
  option: (styles: any, state: any) => ({
    ...styles,
    color: state.isSelected ? theme.colors.primary : theme.colors.fontColor,
    cursor: "pointer",
    backgroundColor: theme.colors.backgrounds.pageBackground,
    "&:hover": {
      filter: theme.colors.hover.filter,
    },
    "&:focus": {
      backgroundColor: "transparent",
    },
    "&:active": {
      backgroundColor: "transparent",
    },
  }),
  menu: (styles: any) => ({
    backgroundColor: theme.colors.backgrounds.pageBackground,
    border: `1px solid ${theme.colors.grey2}`,
    marginTop: theme.spacers.size4,
    borderRadius: theme.sizes.borderRadius[SIZES.MEDIUM],
  }),
  singleValue: () => ({
    color: theme.colors.fontColor,
  }),
  placeholder: () => ({
    color: theme.colors.grey1,
  }),

  control: (styles: any) => ({
    ...styles,
    // none of react-select's styles are passed to <Control />
    width: "100%",
    borderRadius: theme.sizes.borderRadius[SIZES.MEDIUM],
    minHeight: theme.sizes.input[SIZES.SMALL],
    height: theme.sizes.input[SIZES.SMALL],
    backgroundColor: theme.colors.backgrounds.pageBackground,
    cursor: "pointer",
    fontSize: theme.typography.fontSizes.size14,
    color: theme.colors.fontColor,
    padding: `0 ${theme.spacers.size8}`,
    border: `1px solid ${theme.colors.grey2}`,
    alignItems: "center",
    placeContent: "center",
    boxShadow: "none",

    "&:hover": {
      border: `1px solid ${theme.colors.primary}`,
      outline: "none",
    },

    "&:focus": {
      border: `1px solid ${theme.colors.primary}`,
      outline: "none",
      boxShadow: "none",
    },

    "&:disabled": {
      backgroundColor: theme.colors.grey2,
      color: theme.colors.backgrounds.pageBackground,
      cursor: "not-allowed",
    },
  }),
});
