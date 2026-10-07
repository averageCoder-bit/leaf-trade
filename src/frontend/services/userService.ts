import api, { authHeader } from "../hooks/api";
import type { CreateUser, User } from "../schema/users";
import { createUserSchema } from "../schema/users";
import { useQuery } from "@tanstack/react-query";

export default async function createUser(
  data: CreateUser,
  token: string,
): Promise<User> {
  const validatedData = createUserSchema.parse(data);

  const { data: response } = await api.post<User>(
    "/users",
    validatedData,
    authHeader(token),
  );
  return response;
}

export async function getCurrentUser() {
  const { data } = await api.get("users/me");
  return data.user;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
}

export const fetchUserProfile = async (token: string): Promise<User> => {
  const { data } = await api.get<User>("/dashboard/profile", authHeader(token));

  return data;
};
