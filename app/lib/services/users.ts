import { isAxiosError } from "axios";
import {
  InvalidCredentialsError,
  UnknownBackendError,
  ValidationError,
} from "../errors";
import type { User } from "~/types";
import { postAuthenticate, postUserCreate } from "../adapters/auth";

interface AuthData {
  username: string;
  password: string;
}

/**
 * @throws {InvalidCredentialsError} Thrown if username or password are invalid.
 * @throws {UnknownBackendError} Thrown when an unexpected error occurs.
 */
export async function authenticate(data: AuthData) {
  try {
    await postAuthenticate(data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.status == 403) {
        throw new InvalidCredentialsError(
          error.response?.data.title || "Failed to authenticate",
          error.response?.data.details || "Invalid username or password.",
        );
      } else {
        throw new UnknownBackendError(
          error.response?.data.title || "Unexpected error",
          error.response?.data.details ||
            "An unexpected error has occurred. Try again in a few moments.",
        );
      }
    }

    throw error;
  }
}

export class UserRepository {
  public static async create(data: AuthData): Promise<User> {
    try {
      return await postUserCreate(data);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.status == 409) {
          throw new ValidationError(
            error.response?.data.title || "Missing or incorrect data",
            error.response?.data.details ||
              "Some field was left behind or is incorrectly field",
          );
        } else {
          throw new UnknownBackendError(
            error.response?.data.title || "Unexpected error",
            error.response?.data.details ||
              "An unexpected error has occurred. Try again in a few moments.",
          );
        }
      }

      throw error;
    }
  }
}
