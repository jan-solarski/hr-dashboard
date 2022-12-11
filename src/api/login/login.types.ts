export type SignInPayload = {
  username: string;
  password: string;
};

export type LoginState =
  | {
      isLoading: true;
      errorMessage: undefined;
    }
  | {
      isLoading: false;
      errorMessage: string | undefined;
    };

export type InitLoginAction = { type: "init" };
export type ErrorLoginAction = { type: "error"; payload: string };
export type FinishLoginAction = { type: "finish" };

export type LoginAction =
  | InitLoginAction
  | ErrorLoginAction
  | FinishLoginAction;

export type LoginResponse = {
  access_token: string;
};
