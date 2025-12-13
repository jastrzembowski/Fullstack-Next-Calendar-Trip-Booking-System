import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  role: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
