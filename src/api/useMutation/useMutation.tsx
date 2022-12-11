import { useCallback, useReducer, useState } from "react";
// import axios from "../axios";
import { defaultState, mutationReducer } from "./mutationReducer";
import { UseMutationProps } from "./useMutation.types";
import { isAxiosError } from "../axios";

export const useMutation = <T extends {}>({
  mutateFn,
}: UseMutationProps<T>) => {
  const [state, dispatch] = useReducer(mutationReducer, defaultState);

  const onMutate = useCallback(
    async (payload: T) => {
      try {
        dispatch({ type: "init" });
        await mutateFn(payload);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          dispatch({
            type: "error",
            payload: "You are not authorized.",
          });
          return;
        }
        dispatch({
          type: "error",
          payload: "Something went wrong. Try again",
        });
      } finally {
        dispatch({ type: "finish" });
      }
    },
    [mutateFn]
  );

  return { onMutate, state };
};
