import * as z from "zod";

export const userSchema = z.object({
  username: z.string().min(3).max(30),
  firstName: z.string().min(1).max(30),
  lastName: z.string().min(1).max(30),
  email: z.email(),
  phoneNumber: z.string().min(11),
});

export const createUserSchema = z.object({
  firstName: z.string().min(1).max(30),
  lastName: z.string().min(1).max(30),
  email: z.email(),
});

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
