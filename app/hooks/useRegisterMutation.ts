import { useMutation } from "@tanstack/react-query";
import { authenticate, UserRepository } from "~/lib/services/users";

interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async ({ username, password }: RegisterFormData) => {
      await UserRepository.create({ username, password });
      await authenticate({ username, password });
    },
  });
}
