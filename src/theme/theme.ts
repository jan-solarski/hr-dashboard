import { createTheme, SxProps, Theme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6870fa",
    },
  },
});

export type Styles = SxProps<Theme>;
