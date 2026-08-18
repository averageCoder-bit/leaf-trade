import api, { authHeader } from "./api";
import axios from "axios";
import type { CreateUser, User } from "../types/users";

export default async function createUser(
  data: CreateUser,
  token: string,
): Promise<User> {
  console.log("Created user data:", data);
  console.log("Token exists:", !!token);

  try {
    const { data: response } = await api.post<User>(
      "/users",
      data,
      authHeader(token),
    );

    console.log("Response:", response);
    return response;
  } catch (error) {
    console.log("========== CREATE USER ERROR ==========");
    console.log("ERROR OBJECT:", error);

    if (axios.isAxiosError(error)) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("HEADERS:", error.response?.headers);
    }

    console.log("======================================");

    throw error;
  }
}
