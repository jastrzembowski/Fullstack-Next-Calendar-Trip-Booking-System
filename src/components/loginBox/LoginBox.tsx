"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, Logo, Toast } from "@/components";
import { loginSchema, registerSchema } from "@/lib/validators/user.schema";
import { PATHS } from "@/utils";
import { handleLogin, handleRegister } from "@/utils/userActions";

import { Input } from "../input/Input";
import styles from "./LoginBox.module.scss";

interface LoginBoxProps {
  type: "login" | "register";
}

const title = {
  login: "Zaloguj się do swojego konta",
  register: "Zarejestruj się aby korzystać z naszych usług",
};

export const LoginBox = ({ type }: LoginBoxProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    surname?: string;
  }>({});

  const validateField = (field: string, value: string) => {
    if (type === "register") {
      const result = registerSchema.safeParse({
        email: field === "email" ? value : email,
        password: field === "password" ? value : password,
        name: field === "name" ? value : name,
        surname: field === "surname" ? value : surname,
      });

      if (!result.success) {
        const fieldError = result.error.issues.find(
          (issue) => issue.path[0] === field
        );
        return fieldError?.message || undefined;
      }
    } else {
      const result = loginSchema.safeParse({
        email: field === "email" ? value : email,
        password: field === "password" ? value : password,
      });

      if (!result.success) {
        const fieldError = result.error.issues.find(
          (issue) => issue.path[0] === field
        );
        return fieldError?.message || undefined;
      }
    }
    return undefined;
  };

  const validateForm = () => {
    const errors: typeof fieldErrors = {};

    if (type === "register") {
      const result = registerSchema.safeParse({
        email,
        password,
        name,
        surname,
      });

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          if (field === "email") errors.email = issue.message;
          if (field === "password") errors.password = issue.message;
          if (field === "name") errors.name = issue.message;
          if (field === "surname") errors.surname = issue.message;
        });
      }

      if (password !== confirmPassword) {
        errors.confirmPassword = "Hasła nie są identyczne";
      }
    } else {
      const result = loginSchema.safeParse({ email, password });
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          if (field === "email") errors.email = issue.message;
          if (field === "password") errors.password = issue.message;
        });
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);

    if (!validateForm()) {
      Toast("Proszę poprawić błędy w formularzu", "error");
      return;
    }

    setIsLoading(true);

    try {
      if (type === "login") {
        const data = await handleLogin(email, password);
        if (data.success) {
          setTimeout(() => {
            if (data.user.email === "admin@admin.pl") {
              router.push(PATHS.ADMIN);
            } else {
              router.push(PATHS.HOME);
            }
          }, 100);
          Toast("Pomyślnie zalogowano", "success");
        } else {
          setLocalError(data.error || "Nieprawidłowe dane logowania");
          Toast(data.error || "Nieprawidłowe dane logowania", "error");
        }
      } else if (type === "register") {
        const data = await handleRegister(
          email,
          password,
          name,
          surname,
          "user"
        );

        if (data.success) {
          Toast("Rejestracja zakończona sukcesem", "success");
          setTimeout(() => {
            router.push(PATHS.HOME);
          }, 100);
        } else {
          setLocalError(data.error || "Nieprawidłowe dane rejestracji");
          Toast(data.error || "Nie udało się zarejestrować", "error");
        }
      }
    } catch (err) {
      setLocalError("Coś poszło nie tak. Spróbuj ponownie.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Logo className={styles.logo} />
      <h1 className={styles.title}>{title[type]}</h1>
      {type === "register" && (
        <>
          <Input
            type="text"
            placeholder="Imię"
            value={name || ""}
            onChange={(e) => {
              setName(e.target.value);
              if (fieldErrors.name) {
                const error = validateField("name", e.target.value);
                setFieldErrors((prev) => ({
                  ...prev,
                  name: error,
                }));
              }
            }}
            onBlur={(_e) => {
              const error = validateField("name", name);
              setFieldErrors((prev) => ({ ...prev, name: error }));
            }}
            required
            error={fieldErrors.name}
          />
          <Input
            type="text"
            placeholder="Nazwisko"
            value={surname || ""}
            onChange={(e) => {
              setSurname(e.target.value);
              if (fieldErrors.surname) {
                const error = validateField("surname", e.target.value);
                setFieldErrors((prev) => ({
                  ...prev,
                  surname: error,
                }));
              }
            }}
            onBlur={(_e) => {
              const error = validateField("surname", surname);
              setFieldErrors((prev) => ({ ...prev, surname: error }));
            }}
            required
            error={fieldErrors.surname}
          />
        </>
      )}

      <Input
        type="email"
        placeholder="Adres email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (fieldErrors.email) {
            const error = validateField("email", e.target.value);
            setFieldErrors((prev) => ({
              ...prev,
              email: error,
            }));
          }
        }}
        onBlur={(_e) => {
          const error = validateField("email", email);
          setFieldErrors((prev) => ({ ...prev, email: error }));
        }}
        required
        error={fieldErrors.email}
      />
      <Input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (fieldErrors.password) {
            const error = validateField("password", e.target.value);
            setFieldErrors((prev) => ({
              ...prev,
              password: error,
            }));
          }
          if (type === "register" && confirmPassword) {
            if (e.target.value !== confirmPassword) {
              setFieldErrors((prev) => ({
                ...prev,
                confirmPassword: "Hasła nie są identyczne",
              }));
            } else {
              setFieldErrors((prev) => ({
                ...prev,
                confirmPassword: undefined,
              }));
            }
          }
        }}
        onBlur={(_e) => {
          const error = validateField("password", password);
          setFieldErrors((prev) => ({ ...prev, password: error }));
        }}
        required
        error={fieldErrors.password}
      />
      {type === "register" && (
        <Input
          type="password"
          placeholder="Powtórz hasło"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (e.target.value !== password) {
              setFieldErrors((prev) => ({
                ...prev,
                confirmPassword: "Hasła nie są identyczne",
              }));
            } else {
              setFieldErrors((prev) => ({
                ...prev,
                confirmPassword: undefined,
              }));
            }
          }}
          onBlur={(_e) => {
            if (confirmPassword !== password) {
              setFieldErrors((prev) => ({
                ...prev,
                confirmPassword: "Hasła nie są identyczne",
              }));
            } else {
              setFieldErrors((prev) => ({
                ...prev,
                confirmPassword: undefined,
              }));
            }
          }}
          required
          error={fieldErrors.confirmPassword}
        />
      )}
      {localError && <div style={{ color: "red" }}>{localError}</div>}
      <Button
        type="submit"
        variant="secondary"
        className={styles.button}
        disabled={isLoading}
      >
        {type === "login" ? "Logowanie" : "Rejestracja"}
      </Button>
    </form>
  );
};
