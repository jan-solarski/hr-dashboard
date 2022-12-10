import { Box, Button, Paper, Typography } from "@mui/material";
import * as styles from "./Home.styles";
import { buttonsContainer } from "./Home.styles";
import { Link } from "react-router-dom";
import { CenteredLayout } from "../../components/centeredLayout/CenteredLayout";

export const Home = () => {
  return (
    <CenteredLayout>
      <Paper sx={styles.container}>
        <Typography variant="h1">HR Analytics</Typography>
        <Box sx={styles.buttonsContainer}>
          <Button
            component={Link}
            to="/signin"
            variant="contained"
            size="large"
          >
            Sign In
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            size="large"
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </CenteredLayout>
  );
};
