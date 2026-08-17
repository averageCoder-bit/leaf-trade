import api from "./api";
import type { CreateUser, User } from "../types/users";

export default async function createUser(data: CreateUser): Promise<User> {
  console.log("Created user data");
  const { data: response } = await api.post<User>("/users", data);
  console.log(response);
  return response;
}
