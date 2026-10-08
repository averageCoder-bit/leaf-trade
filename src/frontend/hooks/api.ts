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

export const setupAuthInterceptor = (
  getToken: (options?: { template?: string }) => Promise<string | null>,
): (() => void) => {
  const interceptor = api.interceptors.request.use(async (config) => {
    const token = await getToken({
      template: "fastapi",
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return (): void => {
    api.interceptors.request.eject(interceptor);
  };
};

export default api;
