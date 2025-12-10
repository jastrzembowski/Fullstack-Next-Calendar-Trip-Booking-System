"use server";

import { db } from "@/server/db";
import { userSchema } from "@/lib/validators/user.schema";

export async function createUser(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");

  const parsed = userSchema.safeParse({ name, email });
  if (!parsed.success) throw new Error("Invalid input");

  await db.user.create({
    data: parsed.data,
  });
}
