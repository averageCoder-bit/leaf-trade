import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export const authHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
