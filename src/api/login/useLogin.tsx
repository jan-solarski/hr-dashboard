import { useCallback, useState } from "react";
import { SignInPayload } from "../../views/signIn/SignIn.types";
import axios from "../axios";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const onMutate = useCallback(async (payload: SignInPayload) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      await axios.post("/app/auth/login", payload);
    } catch (error) {
      setErrorMessage(`Something went wrong. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { errorMessage, isLoading, onMutate };
};
