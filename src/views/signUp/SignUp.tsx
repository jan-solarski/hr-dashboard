import { CenteredLayout } from "../../components/centeredLayout/CenteredLayout";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import * as styles from "./SignUp.styles";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpPayload } from "./SignUp.types";
import axios from "../../api/axios";
import { useMutation } from "../../api/useMutation/useMutation";
import { useCallback } from "react";

export const SignUp = () => {
  const schema = yup.object().shape({
    firstname: yup.string().required("This field cannot be empty"),
    lastname: yup.string().required("This field cannot be empty"),
    username: yup
      .string()
      .email("Please use a valid e-mail address")
      .required("This field cannot be empty"),
    password: yup.string().required("This field cannot be empty"),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("This field cannot be empty"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpPayload>({
    resolver: yupResolver(schema),
  });

  const { state, onMutate } = useMutation({
    mutateFn: (payload: Omit<SignUpPayload, "passwordRepeat">) =>
      axios.post("/app/auth/register", payload),
  });

  const handleMutate = useCallback(
    async (payload: SignUpPayload) => {
      const { passwordRepeat, ...validApiPayload } = payload;
      onMutate(validApiPayload);
    },
    [onMutate]
  );

  return (
    <CenteredLayout>
      <Paper sx={styles.container}>
        <Typography variant="h4" component="h1">
          Sign Up
        </Typography>
        <Box
          component="form"
          sx={styles.form}
          onSubmit={handleSubmit(handleMutate)}
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
            label="First name *"
            {...register("firstname")}
            error={Boolean(errors.firstname)}
            helperText={errors.firstname?.message}
            fullWidth
          ></TextField>
          <TextField
            variant="standard"
            label="Last name *"
            {...register("lastname")}
            error={Boolean(errors.lastname)}
            helperText={errors.lastname?.message}
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
          <TextField
            variant="standard"
            label="Confirm Password *"
            type="password"
            {...register("passwordRepeat")}
            error={Boolean(errors.passwordRepeat)}
            helperText={errors.passwordRepeat?.message}
            fullWidth
          ></TextField>

          {state.errorMessage && (
            <Typography color="error">{state.errorMessage}</Typography>
          )}
          <Button type="submit" variant="contained" disabled={state.isLoading}>
            Sign Up
          </Button>
          <Typography>
            Already have an account?&#160;
            <Link to={"/signin"}>Click here to login</Link>
          </Typography>
        </Box>
      </Paper>
    </CenteredLayout>
  );
};
