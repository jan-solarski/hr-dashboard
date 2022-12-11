import { MutationAction, MutationState } from "./useMutation.types";

export const defaultState: MutationState = {
  errorMessage: undefined,
  isLoading: false,
};

export const mutationReducer = (
  state: MutationState,
  action: MutationAction
): MutationState => {
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
