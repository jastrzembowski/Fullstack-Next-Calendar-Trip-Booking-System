import { NextResponse } from "next/server";
import { verifyPassword } from "@/server/utils/hash";
import { db } from "@/server/db";
import { signToken } from "@/server/services/token.service";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await db.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ id: user.id });

  const res = NextResponse.json({ success: true });
  res.cookies.set("auth", token, { httpOnly: true });

  return res;
}
