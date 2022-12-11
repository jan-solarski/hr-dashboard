import { LoginAction, LoginState } from "./login.types";

export const defaultLoginState: LoginState = {
  errorMessage: undefined,
  isLoading: false,
};

export const loginReducer = (
  state: LoginState,
  action: LoginAction
): LoginState => {
  switch (action.type) {
    case "init":
      return { isLoading: true, errorMessage: undefined };
    case "finish":
      return { ...state, isLoading: false };
    case "error":
      return { isLoading: false, errorMessage: action.payload };
    default:
      throw new Error("Wrong action type");
  }
};
