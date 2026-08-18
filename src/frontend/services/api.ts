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

export const fetchUserProfile = async (token: string) => {
  const { data } = await api.get("/dashboard/profile", authHeader(token));
  return data;
};

export const updateUserSettings = async (
  token: string,
  settingsData: object,
) => {
  const { data } = await api.post(
    "/dashboard/settings",
    settingsData,
    authHeader(token),
  );
  return data;
};

export default api;
