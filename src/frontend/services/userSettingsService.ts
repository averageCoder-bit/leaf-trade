import api, { authHeader } from "./api";

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
