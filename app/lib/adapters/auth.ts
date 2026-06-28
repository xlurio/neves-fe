import type { UsernamePasswordSchema } from "~/types/adapters";
import { api } from "../api";
import type { User } from "~/types";

interface PostAuthenticateRequestSchema {
  username: string;
  password: string;
}

export async function postAuthenticate(data: PostAuthenticateRequestSchema) {
  await api.post("/api/authenticate", data);
}

export async function postUserCreate(
  data: UsernamePasswordSchema,
): Promise<User> {
  const response = await api.post<User>("/api/users", data);
  return response.data;
}
