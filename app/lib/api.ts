import axios from "axios";
import { isBackendErrorSchema } from "~/types";
import { UnauthenticatedError } from "./errors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const CSRF_COOKIE_NAME = "csrftoken";
const CSRF_HEADER_NAME = "X-CSRFToken";

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookieName = `${encodeURIComponent(name)}=`;
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(cookieName));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(cookieName.length));
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrfToken = getCookieValue(CSRF_COOKIE_NAME);

  if (!csrfToken) {
    return config;
  }

  const headers = axios.AxiosHeaders.from(config.headers);

  if (!headers.has(CSRF_HEADER_NAME)) {
    headers.set(CSRF_HEADER_NAME, csrfToken);
  }

  config.headers = headers;

  return config;
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
