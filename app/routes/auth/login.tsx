import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Box from "@mui/material/Box";
import FormErrorWrapper from "~/components/FormErrorWrapper";
import useFormErrorWrapper from "~/hooks/useFormErrorWrapper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useLoginMutation } from "~/hooks/useLoginMutation";
import { BackendError } from "~/lib/errors";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type LoginFormInputSchema = z.infer<typeof loginFormSchema>;

export default function LoginRoute() {
  const errCtrl = useFormErrorWrapper();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginFormSchema),
  });
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const onSubmitLoginForm = async (formData: LoginFormInputSchema) => {
    try {
      errCtrl.resetFormError();
      await loginMutation.mutateAsync(formData);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof BackendError) {
        errCtrl.setFormError(error.message, error.details);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h2">Login</Typography>
      <FormErrorWrapper formErrorState={errCtrl.formErrorState}>
        <>
          <form onSubmit={handleSubmit(onSubmitLoginForm)}>
            <Controller
              name="username"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Button type="submit">Enter</Button>
          </form>
          <Link href="/register">I'm new here.</Link>
        </>
      </FormErrorWrapper>
    </Box>
  );
}
