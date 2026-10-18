import api from "../hooks/api";
import type { CreateUser, User } from "../schema/users";
import { createUserSchema } from "../schema/users";
import { useQuery } from "@tanstack/react-query";

export default async function createUser(data: CreateUser): Promise<User> {
  const validatedData = createUserSchema.parse(data);

  const { data: response } = await api.post<User>("/users", validatedData);
  return response;
}

export async function getCurrentUser() {
  console.log("Vite API URL:", import.meta.env.VITE_API_BASE_URL);

  console.log("Axios Base URL:", api.defaults.baseURL);

  const { data } = await api.get("/users/me");

  console.log("User response:", data);

  return data.user;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
}

export const fetchUserProfile = async (): Promise<User> => {
  const { data } = await api.get<User>("/dashboard/profile");

  return data;
};
