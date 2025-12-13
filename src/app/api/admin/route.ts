import { NextResponse } from "next/server";

import { getCurrentUser } from "@/server/auth";
import { DateService } from "@/server/services/date.service";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to view dates." },
        { status: 401 }
      );
    }
    const dates = await DateService.findAllWithUser();

    return NextResponse.json({ success: true, dates });
  } catch (error) {
    console.error("Error fetching dates:", error);
    return NextResponse.json(
      { error: "Failed to fetch dates" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to delete a date." },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Date ID is required" },
        { status: 400 }
      );
    }
    await DateService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting date:", error);
    return NextResponse.json(
      { error: "Failed to delete date" },
      { status: 500 }
    );
  }
}