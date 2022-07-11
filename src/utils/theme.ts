import { createTheme } from "@mui/material/styles";
import { orange, teal, amber, grey, red, purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: teal[400],
      light: grey[200],
      dark: teal[600],
    },
    secondary: {
      main: purple[500],
      light: teal[200],
      dark: purple[700],
    },
    error: {
      main: red[700],
      light: red[500],
      dark: red[900],
    },
    warning: {
      main: amber[400],
      light: amber[200],
      dark: orange[600],
    },
    success: {
      main: teal[400],
      light: grey[200],
      dark: teal[600],
    },
    info: {
      main: grey[900],
      light: grey[700],
      dark: grey[900],
    },
  },
});
