import { Api, ContentType } from "./api";

const API_URL = import.meta.env.VITE_API_URL;

const baseUrl = `${API_URL}/api`;

export const api = new Api({
  baseUrl,
  headers: {
    "content-type": ContentType.Json,
  },
  format: "json",
  authHeader: "Authorization",
});
