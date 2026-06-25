import { useCallback, useReducer } from "react";
import { NotImplementedError } from "~/lib/errors";
import type { BackendErrorSchema } from "~/types";

interface FormSetErrorReducerAction {
  type: "SET_ERROR";
  payload: BackendErrorSchema;
}

function isSetErrorFormRdcAct(
  value: unknown,
): value is FormSetErrorReducerAction {
  return (
    value !== null &&
    typeof value === "object" &&
    "type" in value &&
    value.type === "SET_ERROR" &&
    "payload" in value &&
    value.payload !== null &&
    typeof value.payload === "object" &&
    "title" in value.payload &&
    typeof value.payload.title === "string" &&
    "details" in value.payload &&
    typeof value.payload.details === "string"
  );
}

interface FormResetErrorReducerAction {
  type: "RESET_ERROR";
}

function isResetErrorFormRdcAct(
  value: unknown,
): value is FormResetErrorReducerAction {
  return (
    value !== null &&
    typeof value === "object" &&
    "type" in value &&
    value.type === "RESET_ERROR"
  );
}

type FormErrorReducerAction =
  | FormSetErrorReducerAction
  | FormResetErrorReducerAction;

function formErrorReducer(
  _: BackendErrorSchema,
  action: FormErrorReducerAction,
) {
  if (isSetErrorFormRdcAct(action)) {
    return action.payload;
  } else if (isResetErrorFormRdcAct(action)) {
    return {
      code: "",
      title: "",
      details: "",
    };
  }
  throw new NotImplementedError("No handler was implemented for this action");
}

export default function useFormErrorWrapper() {
  const [reducerState, reducerDispatch] = useReducer(formErrorReducer, {
    code: "",
    title: "",
    details: "",
  });

  const setFormError = useCallback((title: string, details: string) => {
    reducerDispatch({
      type: "SET_ERROR",
      payload: {
        code: "UNKNOWN",
        title,
        details,
      },
    });
  }, []);

  const resetFormError = useCallback(() => {
    reducerDispatch({
      type: "RESET_ERROR",
    });
  }, []);

  return {
    setFormError,
    resetFormError,
    formErrorState: reducerState,
  };
}
