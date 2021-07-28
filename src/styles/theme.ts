export type ThemeColors = {
  primary: string;
  secondary: string;
  danger: string;
  success: string;
  iconColor: string;
  fontColor: string;
  iconHover: string;
  oppositeFontColor: string;
  grey1: string;
  grey2: string;
  grey3: string;
  loadingBlocks: string;
  disabled: string;
  selection: string;
  backgrounds: {
    studyModeBackground: string;
    modalBackground: string;
    lightbox: string;
    pageBackground: string;
  };
  hover: {
    filter: string;
  };
  active: {
    filter: string;
  };
  colorPicker: {
    background: {
      default: string;
      red: string;
      orange: string;
      yellow: string;
      green: string;
      blue: string;
      indigo: string;
      violet: string;
      grey: string;
      brown: string;
    };
    text: {
      default: string;
      primary: string;
      red: string;
      orange: string;
      yellow: string;
      green: string;
      blue: string;
      indigo: string;
      violet: string;
      grey: string;
    };
  };
};

export type ThemeType = {
  boxShadow: string;

  colors: ThemeColors;

  icons: {
    size: string;
  };

  typography: {
    fontSizes: {
      size10: string;
      size12: string;
      size14: string;
      size16: string;
      size18: string;
      size20: string;
      size22: string;
      size26: string;
      size32: string;
      size42: string;
      size48: string;
    };

    lineHeight: string;
    lineHeightSmall: string;
    fontFamily: string;

    fontWeights: {
      light: string;
      normal: string;
      bold: string;
    };
  };

  sizes: {
    modal: {
      small: string;
      medium: string;
      large: string;
    };

    scrollerModal: string;

    sidebar: string;

    input: {
      small: string;
      medium: string;
      large: string;
    };

    button: {
      height: {
        small: string;
        medium: string;
        large: string;
      };
      width: {
        small: string;
        medium: string;
        large: string;
      };
    };

    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };

    icons: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
    };

    wrappers: {
      small: string;
      medium: string;
      large: string;
    };
  };

  spacers: {
    size4: string;
    size8: string;
    size12: string;
    size16: string;
    size20: string;
    size24: string;
    size32: string;
    size40: string;
    size48: string;
    size56: string;
    size64: string;
    size80: string;
    size128: string;
  };
};

const lightThemeColors: ThemeColors = {
  primary: "#00B6CE",
  secondary: "#F5F5F4",
  danger: "#DB524B",
  success: "#0CCA4A",
  iconColor: "#2C2C31",
  fontColor: "#2C2C31",
  iconHover: "rgba(60, 45, 40, 0.1)",
  oppositeFontColor: "#FFFFFFE6",
  grey1: "#A9A9A9", // dark
  grey2: "#D3D3D3", // mid
  grey3: "#EAEAEA", // light
  loadingBlocks: "#EAEAEA",
  disabled: "#D3D3D3",
  selection: "#B1FAFF",
  backgrounds: {
    studyModeBackground: "#F7F8FA",
    modalBackground: "#FFF",
    lightbox: "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
    pageBackground: "#FFF",
  },
  hover: {
    filter: "brightness(92%)",
  },
  active: {
    filter: "brightness(90%)",
  },
  colorPicker: {
    background: {
      default: "#FFFFFF",
      red: "#FBE4E4",
      orange: "#FAEBDD",
      yellow: "#FBF3DB",
      green: "#DDEDEA",
      blue: "#DDEBF1",
      indigo: "#EAE4F2",
      violet: "#F4DFEB",
      grey: "#EBECED",
      brown: "#E9E5E3",
    },
    text: {
      default: "#2C2C31",
      primary: "#00B6CE",
      red: "#E81123",
      orange: "#F7630D",
      yellow: "#FABD14",
      green: "#0F893E",
      blue: "#3971D1",
      indigo: "#4B0082",
      violet: "#AC008C",
      grey: "#84939A",
    },
  },
};

const darkThemeColors: ThemeColors = {
  primary: "#0094ce",
  secondary: "#474C50",
  danger: "#DB524B",
  success: "#0CCA4A",
  iconColor: "#F0F0F0",
  fontColor: "#F0F0F0",
  iconHover: "#5C5C5C",
  oppositeFontColor: "#2C2C31",
  grey1: "#E0E0E0", // light
  grey2: "#9E9E9E", // mid
  grey3: "#616161", // dark
  loadingBlocks: "#5C5C5C",
  disabled: "#616161",
  selection: "#474C50",
  backgrounds: {
    studyModeBackground: "#2C2C31",
    modalBackground: "#2F3437",
    lightbox: "#0F0F0F99",
    pageBackground: "#2F3437",
  },
  hover: {
    filter: "brightness(115%)",
  },
  active: {
    filter: "brightness(125%)",
  },
  colorPicker: {
    background: {
      default: "#2F3437",
      red: "#67371A",
      orange: "#594A3A",
      yellow: "#59563B",
      green: "#195028",
      blue: "#28456D",
      indigo: "#523271",
      violet: "#5A2F51",
      grey: "#666666",
      brown: "#434040",
    },
    text: {
      default: "#F0F0F0",
      primary: "#0094CE",
      red: "#FB7575",
      orange: "#FF9B60",
      yellow: "#FFD45C",
      green: "#74E092",
      blue: "#87C25B",
      indigo: "#CA8BF7",
      violet: "#FF81DB",
      grey: "#C1C1C1",
    },
  },
};

export const theme = (darkTheme?: boolean): ThemeType => {
  return {
    boxShadow: darkTheme
      ? "rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 20%) 0px 3px 6px, rgb(15 15 15 / 40%) 0px 9px 24px"
      : "rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 12px",

    colors: {
      ...(darkTheme ? darkThemeColors : lightThemeColors),
    },

    icons: {
      size: "16px",
    },

    typography: {
      fontSizes: {
        size10: "10px",
        size12: "12px",
        size14: "14px",
        size16: "16px",
        size18: "18px",
        size20: "20px",
        size22: "22px",
        size26: "26px",
        size32: "32px",
        size42: "42px",
        size48: "48px",
      },

      lineHeight: "1.6",
      lineHeightSmall: "1.4",

      fontFamily: "DM Sans, sans-serif",

      fontWeights: {
        light: "300",
        normal: "400",
        bold: "700",
      },
    },

    sizes: {
      modal: {
        small: "220px",
        medium: "380px",
        large: "500px",
      },
      scrollerModal: "272px",

      sidebar: "230px",

      input: {
        small: "32px",
        medium: "40px",
        large: "48px;",
      },

      borderRadius: {
        small: "2px",
        medium: "5px",
        large: "8px",
      },

      button: {
        height: {
          small: "32px",
          medium: "40px",
          large: "48px;",
        },
        width: {
          small: "150px",
          medium: "200px",
          large: "250px;",
        },
      },

      icons: {
        small: "18px",
        medium: "20px",
        large: "24px",
        xlarge: "28px",
      },

      wrappers: {
        small: "1200px",
        medium: "1400px",
        large: "1600px",
      },
    },

    spacers: {
      size4: "4px",
      size8: "8px",
      size12: "12px",
      size16: "16px",
      size20: "20px",
      size24: "24px",
      size32: "32px",
      size40: "40px",
      size48: "48px",
      size56: "56px",
      size64: "64px",
      size80: "80px",
      size128: "128px",
    },
  };
};
