import axios from "axios";
import { isBackendErrorSchema } from "~/types";
import { UnauthenticatedError } from "./errors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return Promise.reject(new UnauthenticatedError());
      }

      if (
        isBackendErrorSchema(error.response?.data) &&
        error.response.data.code === "AUTH_ERROR"
      ) {
        return Promise.reject(new UnauthenticatedError());
      }
    }

    return Promise.reject(error);
  },
);
