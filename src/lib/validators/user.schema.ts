import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email jest wymagany")
    .email("Nieprawidłowy adres email"),
  password: z
    .string()
    .min(6, "Hasło musi mieć co najmniej 6 znaków")
    .max(100, "Hasło nie może mieć więcej niż 100 znaków")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Hasło musi zawierać co najmniej jedną małą literę, jedną wielką literę i jedną cyfrę"
    ),
  name: z
    .string()
    .min(2, "Imię musi mieć co najmniej 2 znaki")
    .max(50, "Imię nie może mieć więcej niż 50 znaków")
    .regex(
      /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/,
      "Imię może zawierać tylko litery, spacje i myślniki"
    ),
  surname: z
    .string()
    .min(2, "Nazwisko musi mieć co najmniej 2 znaki")
    .max(50, "Nazwisko nie może mieć więcej niż 50 znaków")
    .regex(
      /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/,
      "Nazwisko może zawierać tylko litery, spacje i myślniki"
    ),
  role: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
  password: z.string().min(1, "Hasło jest wymagane"),
});
