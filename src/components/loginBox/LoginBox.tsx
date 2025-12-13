"use client";

import { useState } from "react";
import { Button, Logo } from "@/components";
import { handleLogin, handleRegister } from "@/app/actions";
import styles from "./LoginBox.module.scss";
import { Input } from "../input/Input";
import { PATHS } from "@/utils";
import { redirect } from "next/navigation";
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
  const [email, setEmail] = useState("");
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
        if (!data.success) {
          setLocalError(data.error || "Login failed");
        }
      } else if (type === "register") {
        const data = await handleRegister(email, password);

        if (data.success) {
          console.log(data);
        } else {
          setLocalError(data.error || "Registration failed");
        }
      }
    } catch (err) {
      setLocalError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Logo className={styles.logo} />
      <h1 className={styles.title}>{title[type]}</h1>
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
