export type ThemeType = {
  boxShadow: string;

  colours: {
    primary: string;
    primaryHover: string;
    success: string;
    danger: string;
    grey1: string; // dark
    grey2: string; // mid
    grey3: string; // light
    offWhite: string;
    beige: string;
    offBlack: string;
    fontColour: string;
  };

  filters: {
    hover: string;
    pressed: string;
  };

  icons: {
    size: string;
  };

  typography: {
    fontSizes: {
      size10: string;
      size12: string;
      size14: string;
      size16: string;
      size20: string;
      size22: string;
      size26: string;
      size32: string;
      size42: string;
      size54: string;
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

  display: {
    borderRadiusFive: string;
    borderRadiusTwo: string;
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
    size64: string;
    size80: string;
    size128: string;
  };
};

export const theme: ThemeType = {
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  colours: {
    primary: "#00B6CE",
    primaryHover: "#00A7BE",
    danger: "#DB524B",
    success: "#0CCA4A",
    grey1: "#B8B7B6", // dark
    grey2: "#DAD9D7", // mid
    grey3: "#EAEAEA", // light
    offWhite: "#F7F8FA",
    beige: "#F5F5F4",
    offBlack: "#2C2C31",
    fontColour: "#2C2C31",
  },

  filters: {
    hover: "80%",
    pressed: "60%",
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
      size20: "20px",
      size22: "22px",
      size26: "26px",
      size32: "32px",
      size42: "42px",
      size54: "54px",
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

  display: {
    borderRadiusFive: "5px",
    borderRadiusTwo: "2px",
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
    size64: "64px",
    size80: "80px",
    size128: "128px",
  },
};
