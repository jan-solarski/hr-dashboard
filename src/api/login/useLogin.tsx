import { useCallback, useReducer, useState } from "react";
import { SignInPayload } from "../../views/signIn/SignIn.types";
import axios from "../axios";
import { defaultLoginState, loginReducer } from "./loginReducer";

export const useLogin = () => {
  const [loginState, dispatchLoginAction] = useReducer(
    loginReducer,
    defaultLoginState
  );
  const onMutate = useCallback(async (payload: SignInPayload) => {
    try {
      dispatchLoginAction({ type: "init" });
      await axios.post("/app/auth/login", payload);
    } catch (error) {
      dispatchLoginAction({
        type: "error",
        payload: "Something went wrong. Try again",
      });
    } finally {
      dispatchLoginAction({ type: "finish" });
    }
  }, []);

  return { onMutate, loginState };
};
