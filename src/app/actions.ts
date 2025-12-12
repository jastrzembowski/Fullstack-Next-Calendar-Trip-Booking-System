"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PATHS } from "@/utils";

export async function handleLogout() {
  (await cookies()).delete("auth");
  redirect(PATHS.HOME);
}

