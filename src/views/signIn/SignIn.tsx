import { CenteredLayout } from "../../components/centeredLayout/CenteredLayout";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import * as styles from "./SignIn.styles";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInPayload } from "./SignIn.types";
import axios from "../../api/axios";
import { useMutation } from "../../api/useMutation/useMutation";

export const SignIn = () => {
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const { state, onMutate } = useMutation({
    mutateFn: (payload: SignInPayload) =>
      axios.post("/app/auth/login", payload),
  });

  const schema = yup.object().shape({
    username: yup
      .string()
      .email("Please use a valid e-mail address")
      .required("This field cannot be empty"),
    password: yup.string().required("This field cannot be empty"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInPayload>({
    resolver: yupResolver(schema),
  });

  return (
    <CenteredLayout>
      <Paper sx={styles.container}>
        <Typography variant="h4" component="h1">
          Sign In
        </Typography>
        <Box
          component="form"
          sx={styles.form}
          onSubmit={handleSubmit(onMutate)}
        >
          <TextField
            variant="standard"
            label="Email *"
            {...register("username")}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
            fullWidth
          ></TextField>
          <TextField
            variant="standard"
            label="Password *"
            type="password"
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            fullWidth
          ></TextField>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRememberMeChecked}
                  onChange={(e) => setIsRememberMeChecked(e.target.checked)}
                />
              }
              label="Remember me"
            />
          </FormGroup>

          {state.errorMessage && (
            <Typography color="error">{state.errorMessage}</Typography>
          )}
          <Button type="submit" variant="contained" disabled={state.isLoading}>
            Sign In
          </Button>
          <Typography>
            Don&apos;t have an account?&#160;
            <Link to={"/signup"}>Click here to create one</Link>
          </Typography>
        </Box>
      </Paper>
    </CenteredLayout>
  );
};
