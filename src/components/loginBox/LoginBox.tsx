"use client";

import { useState } from "react";
import { Button } from "@/components";

interface LoginBoxProps {
  error: string;
  isLoading: boolean;
  type: "login" | "register";
}

export const LoginBox = ({
  error,
  isLoading,
  type,
}: LoginBoxProps) => {
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
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
        } else {
          setLocalError(data.error || "Login failed");
        }
      } else if (type === "register") {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        autoComplete={type === "login" ? "current-password" : "new-password"}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {type === "register" && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          autoComplete="new-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      )}
      {(error || localError) && (
        <div style={{ color: "red" }}>{localError || error}</div>
      )}
      <Button type="submit" disabled={isLoading}>
        {type === "login" ? "Login" : "Register"}
      </Button>
    </form>
  );
};