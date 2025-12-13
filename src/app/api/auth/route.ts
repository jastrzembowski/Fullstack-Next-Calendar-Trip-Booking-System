import { NextResponse } from "next/server";

import { loginSchema } from "@/lib/validators/user.schema";
import { signToken } from "@/server/services/token.service";
import { UserService } from "@/server/services/user.service";
import { verifyPassword } from "@/server/utils/hash";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const user = await UserService.findByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane logowania" },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane logowania" },
        { status: 401 }
      );
    }

    const token = signToken({ id: user.id });

    const res = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email },
      token,
    });

    res.cookies.set("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
