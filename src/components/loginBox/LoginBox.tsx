"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, Logo, Toast } from "@/components";
import { PATHS } from "@/utils";
import { handleLogin, handleRegister } from "@/utils/userActions";

import { Input } from "../input/Input";
import styles from "./LoginBox.module.scss";

interface LoginBoxProps {
  error: string;
  isLoading: boolean;
  type: "login" | "register";
}

const title = {
  login: "Zaloguj się do swojego konta",
  register: "Zarejestruj się aby korzystać z naszych usług",
};

export const LoginBox = ({ error, isLoading, type }: LoginBoxProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);

    if (type === "register" && password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    try {
      if (type === "login") {
        const data = await handleLogin(email, password);
        if (data.success) {
          Toast("Pomyślnie zalogowano", "success");
          setTimeout(() => {
            router.push(PATHS.HOME);
          }, 100);
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
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Logo className={styles.logo} />
      <h1 className={styles.title}>{title[type]}</h1>
      {type === "register" && (
        <>
          <Input
            type="name"
            placeholder="Name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="surname"
            placeholder="Surname"
            value={surname || ""}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </>
      )}

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {type === "register" && (
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      )}
      {(error || localError) && (
        <div style={{ color: "red" }}>{localError || error}</div>
      )}
      <Button type="submit" disabled={isLoading} className={styles.button}>
        {type === "login" ? "Logowanie" : "Rejestracja"}
      </Button>
    </form>
  );
};
