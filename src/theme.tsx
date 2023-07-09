import {
  PaletteOptions,
  ThemeOptions,
  alpha,
  createTheme,
} from "@mui/material";

const commonPalette: Pick<PaletteOptions, "error" | "grayish"> = {
  error: {
    main: "#EA5555",
    dark: "#FF9898",
  },
  grayish: {
    main: "#828FA3",
  },
};
const typography: ThemeOptions["typography"] = {
  fontFamily: "Plus Jakarta Sans",
  XL: {
    fontSize: "24px",
    lineHeight: "30px",
    fontWeight: 700,
  },

  L: {
    fontSize: "18px",
    lineHeight: "23px",
    fontWeight: 700,
  },
  M: {
    fontSize: "15px",
    lineHeight: "19px",
    fontWeight: 700,
  },
  S: {
    fontSize: "12px",
    lineHeight: "15px",
    fontWeight: 700,
    letterSpacing: "2.4px",
  },
  body1: {
    fontSize: "13px",
    lineHeight: "23px",
    fontWeight: 500,
  },
  body2: {
    fontSize: "12px",
    lineHeight: "15px",
    fontWeight: 700,
  },
};

const components: ThemeOptions["components"] = {
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: "23px 16px",
      }),
    },
  },

  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "4px",
        "& input": {
          padding: "9px 16px",
        },
      }),
    },
  },

  MuiList: {
    defaultProps: {
      disablePadding: true,
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: "inherit",
        minWidth: "32px",
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "0px 100px 100px 0px",
        color: theme.palette.grayish.main,
        width: "276px",
        paddingLeft: "32px",
        "&:hover": {
          color: theme.palette.primary.main,
          backgroundColor:
            theme.palette.mode === "light"
              ? alpha(theme.palette.primary.main, 0.1)
              : "#fff",
        },
        "&.Mui-selected": {
          backgroundColor: theme.palette.primary.main,
          color: "#ffff",
        },
      }),
    },
  },
  MuiContainer: {
    defaultProps: {
      sx: { px: { md: "125px", sm: "39px", xs: "24px" } },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& ::placeholder": typography.body1,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      sizeLarge: {
        padding: "15px 24px 14px 24px",
        ...typography.M,
      },
      root: {
        textTransform: "none",
        padding: "9px 69px",
        borderRadius: "24px",
        ...typography.body2,
      },
    },
    defaultProps: {
      variant: "contained",
      color: "primary",
      disableElevation: true,
      size: "large",
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      colorPrimary: ({ theme }) => ({
        "& svg": {
          width: 24,
          height: 24,
        },
        "&:not(.Mui-checked) svg": {
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.background.default
              : "rgba(255,255,255,0.1)",
        },
        "&:not(.Mui-checked) path": { display: "none" },
      }),
    },
    defaultProps: {
      disableRipple: true,
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#635FC7",
      light: "#A8A4FF",
      dark: "#A8A4FF",
    },
    secondary: {
      main: "#f0effa",
      contrastText: "#635FC7",
      dark: "#d8d7f1",
    },
    background: {
      paper: "#FFFFFF",
      default: "#F4F7FD",
    },
    lines: {
      main: "#E4EBFA",
    },
    ...commonPalette,
  },
  typography: {
    ...typography,
    allVariants: {
      color: "#000",
    },
  },
  components,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5964E0",
      dark: "#939BF4",
    },
    secondary: {
      main: "#FFFFFF",
      dark: "#F4F7FD",
    },
    background: {
      paper: "#2b2c37",
      default: "#20212c",
    },
    lines: {
      main: "#3E3F4E",
    },
    ...commonPalette,
  },
  typography: {
    ...typography,
    allVariants: {
      color: "#fff",
    },
  },
  components,
});

declare module "@mui/material/styles" {
  interface TypographyVariants {
    XL: React.CSSProperties;
    L: React.CSSProperties;
    M: React.CSSProperties;
    S: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    XL?: React.CSSProperties;
    L?: React.CSSProperties;
    M?: React.CSSProperties;
    S?: React.CSSProperties;
  }

  interface Palette {
    grayish: Palette["primary"];
    lines: Palette["primary"];
  }

  interface PaletteOptions {
    grayish: PaletteOptions["primary"];
    lines: PaletteOptions["primary"];
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    XL: true;
    L: true;
    M: true;
    S: true;
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    button: false;
    caption: false;
    overline: false;
    subtitle1: false;
    subtitle2: false;
  }
}
