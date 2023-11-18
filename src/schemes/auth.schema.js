import { object, z } from "zod";

export const registerSchema = z.object({
  username: z.string({ message: "Username is required" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string({ message: "Password is required" }).min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});
