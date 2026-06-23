import { useMutation } from "@tanstack/react-query";
import { authenticate } from "~/lib/services/users";

interface LoginFormData {
  username: string;
  password: string;
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: (data: LoginFormData) => authenticate(data),
  });
}