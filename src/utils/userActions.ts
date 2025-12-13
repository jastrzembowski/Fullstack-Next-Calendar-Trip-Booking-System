"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { PATHS } from "@/utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function handleLogout() {
  (await cookies()).delete("auth");
  redirect(PATHS.HOME);
}

export async function handleLogin(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (data.success && data.token) {
    const cookieStore = await cookies();
    cookieStore.set("auth", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return { success: true };
  } else {
    return { success: false, error: data.error };
  }
}

export async function handleRegister(
  email: string,
  password: string,
  name: string,
  surname: string,
  role: string
) {
  const response = await fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, surname, role }),
  });
  const data = await response.json();
  if (data.success && data.token) {
    const cookieStore = await cookies();
    cookieStore.set("auth", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }
  return data;
}

export async function handleFetchUser() {
  try {
    const response = await fetch(`${BASE_URL}/api/user`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { user: null };
  }
}
