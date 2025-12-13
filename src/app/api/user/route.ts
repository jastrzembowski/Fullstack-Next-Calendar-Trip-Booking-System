import { NextResponse } from "next/server";
import { getCurrentUser } from "@/server/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Debug: Check if cookie exists
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("auth");
    
    if (!authCookie) {
      console.log("No auth cookie found in API route");
      return NextResponse.json(
        { error: "Unauthorized - No token found" },
        { status: 401 }
      );
    }

    const user = await getCurrentUser();

    if (!user) {
      console.log("getCurrentUser returned null");
      return NextResponse.json(
        { error: "Unauthorized - Invalid token or user not found" },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

