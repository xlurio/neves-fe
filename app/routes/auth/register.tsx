import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Box from "@mui/material/Box";
import FormErrorWrapper from "~/components/FormErrorWrapper";
import useFormErrorWrapper from "~/hooks/useFormErrorWrapper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRegisterMutation } from "~/hooks/useRegisterMutation";
import { BackendError } from "~/lib/errors";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const registerFormSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((val) => val.password == val.confirmPassword);

type RegisterFormInputSchema = z.infer<typeof registerFormSchema>;

export default function RegisterRoute() {
  const errCtrl = useFormErrorWrapper();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(registerFormSchema),
  });
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const onSubmitRegisterForm = async (formData: RegisterFormInputSchema) => {
    try {
      errCtrl.resetFormError();
      await registerMutation.mutateAsync(formData);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof BackendError) {
        errCtrl.setFormError(error.message, error.details);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h2">Registration</Typography>
      <FormErrorWrapper formErrorState={errCtrl.formErrorState}>
        <form onSubmit={handleSubmit(onSubmitRegisterForm)}>
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
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Confirm your password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Button type="submit">Register</Button>
        </form>
      </FormErrorWrapper>
    </Box>
  );
}
