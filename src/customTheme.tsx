import { createTheme } from "@mui/material/styles";

// Custome theme to override material ui styles where necesary for JLR UI

export let customTheme = createTheme({
  typography: {
    fontFamily: "JLR Emeric Regular , JLR Emeric ExtraLight",
  },
  palette: {
    primary: {
      light: "#8C8C8C",
      main: "#525252",
      dark: "#1E1E1E",
    },
    secondary: {
      main: "#0057ff",
    },

    text: {
      primary: "black",
      secondary: "#FFFFFF",
    },
  },
});

customTheme = createTheme({
  ...customTheme,

  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        html: {
          boxSizing: "border-box",
          minHeight: "100%",
        },

        body: {
          backgroundColor: "#f8f7f6",
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        body2: {
          color: "#525252",
        },
      },
    },

    MuiPaginationItem: {
      styleOverrides: {
        previousNext: {
          color: "#0057ff",
        },
      },
    },
  },
});
