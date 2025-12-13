import { NextResponse } from "next/server";

import { userSchema } from "@/lib/validators/user.schema";
import { db } from "@/server/db";

export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = userSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const user = await db.user.create({
    data: parsed.data,
  });

  return NextResponse.json(user, { status: 201 });
}
