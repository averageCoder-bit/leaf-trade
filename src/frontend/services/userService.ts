import api, { authHeader } from "./api";
import type { CreateUser, User } from "../schema/users";
import { createUserSchema } from "../schema/users";

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

  console.log(response);

  return response;
}

export const fetchUserProfile = async (token: string): Promise<User> => {
  const { data } = await api.get<User>("/dashboard/profile", authHeader(token));

  return data;
};
