import { Box } from "@mui/material";
import * as styles from "./CenteredLayout.styles";
import { CenteredLayoutProps } from "./CenteredLayout.types";

export const CenteredLayout = ({ children }: CenteredLayoutProps) => {
  return <Box sx={styles.layout}>{children}</Box>;
};
