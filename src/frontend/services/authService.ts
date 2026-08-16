import api from "./api";
import type { CreateUserInput, User } from "../types/users";

export default async function createUser(data: CreateUserInput): Promise<User> {
  console.log("Created user data");
  const { data: response } = await api.post<User>("/users", data);
  console.log(response);
  return response;
}
