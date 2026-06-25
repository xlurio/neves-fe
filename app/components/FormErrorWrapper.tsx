import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import type { ReactElement } from "react";
import type { BackendErrorSchema } from "~/types";

interface FormErrorWrapperProps {
  formErrorState: BackendErrorSchema;
  children: ReactElement;
}

export default function FormErrorWrapper({
  formErrorState,
  children,
}: FormErrorWrapperProps) {
  const hasError = Boolean(formErrorState.title || formErrorState.details);

  return (
    <>
      {hasError ? (
        <Alert severity="error">
          <AlertTitle>{formErrorState.title}</AlertTitle>
          {formErrorState.details}
        </Alert>
      ) : null}
      {children}
    </>
  );
}
