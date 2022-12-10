import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { AppProvidersProps } from "./AppProviders.types";
import { theme } from "../theme/theme";

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
