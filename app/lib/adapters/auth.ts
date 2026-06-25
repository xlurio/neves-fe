import { api } from "../api";
import type { User } from "~/types";
import type { PostUserCreateRequestSchema } from "./types";

interface PostAuthenticateRequestSchema {
  username: string;
  password: string;
}

export async function postAuthenticate(data: PostAuthenticateRequestSchema) {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return;
  }

  await api.post("/api/authenticate", data);
}

export async function postUserCreate(
  data: PostUserCreateRequestSchema,
): Promise<User> {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return {
      id: "7e28eae1-f854-41e4-87b3-b582354b91ee",
      username: "user",
      password: "somepwd",
    };
  }

  const response = await api.post<User>("/api/users", data);
  return response.data;
}
