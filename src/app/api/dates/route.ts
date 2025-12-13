import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { dateSchema } from "@/lib/validators/date.schema";
import { getCurrentUser } from "@/server/auth";
import { DateService } from "@/server/services/date.service";
import { verifyToken } from "@/server/services/token.service";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;
    const decoded = verifyToken(token!) as { id: number };
    const userId = decoded.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to view dates." },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");

    let dates;
    if (dateParam) {
      // Validate date format (should be YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dateParam)) {
        return NextResponse.json(
          { error: "Invalid date format. Expected YYYY-MM-DD" },
          { status: 400 }
        );
      }
      // Find all dates for the specified date (ignoring time)
      dates = await DateService.findByDate(dateParam);
    } else {
      // If no date parameter, return all dates
      dates = await DateService.findAll();
    }

    return NextResponse.json({ success: true, dates });
  } catch (error) {
    console.error("Error fetching dates:", error);
    return NextResponse.json(
      { error: "Failed to fetch dates" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to create a reservation." },
        { status: 401 }
      );
    }

    const body = await req.json();

    const parsed = dateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
    }

    const dateString =
      parsed.data.date instanceof Date
        ? parsed.data.date.toISOString()
        : parsed.data.date;

    const date = await DateService.create({
      date: dateString,
      userId: user.id,
      title: parsed.data.title,
    });

    return NextResponse.json(date, { status: 201 });
  } catch (error) {
    console.error("Error creating date:", error);
    return NextResponse.json(
      { error: "Failed to create date" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    // Authenticate user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to update a reservation." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Date ID is required" },
        { status: 400 }
      );
    }

    // Verify the date belongs to the current user
    const existingDate = await DateService.findById(id);
    if (!existingDate) {
      return NextResponse.json({ error: "Date not found" }, { status: 404 });
    }

    if (existingDate.userId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden. You can only update your own reservations." },
        { status: 403 }
      );
    }

    const data = updateData.date
      ? {
          ...updateData,
          date:
            typeof updateData.date === "string"
              ? updateData.date
              : updateData.date instanceof Date
                ? updateData.date.toISOString()
                : String(updateData.date),
        }
      : updateData;

    const date = await DateService.update(id, data);

    return NextResponse.json(date);
  } catch (error) {
    console.error("Error updating date:", error);
    return NextResponse.json(
      { error: "Failed to update date" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    // Authenticate user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to delete a reservation." },
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

    // Verify the date belongs to the current user
    const existingDate = await DateService.findById(id);
    if (!existingDate) {
      return NextResponse.json({ error: "Date not found" }, { status: 404 });
    }

    if (existingDate.userId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden. You can only delete your own reservations." },
        { status: 403 }
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
