import { NextResponse } from "next/server";
import { dateSchema } from "@/lib/validators/date.schema";
import { DateService } from "@/server/services/date.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let dates;
    if (userId) {
      dates = await DateService.findByUserId(parseInt(userId));
    } else {
      dates = await DateService.findAll();
    }

    return NextResponse.json(dates);
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
    const body = await req.json();

    const parsed = dateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues },
        { status: 400 }
      );
    }

    const dateData = {
      ...parsed.data,
      date: parsed.data.date instanceof Date 
        ? parsed.data.date 
        : new Date(parsed.data.date),
    };

    const date = await DateService.create(dateData);

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
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Date ID is required" },
        { status: 400 }
      );
    }

    const data = updateData.date
      ? {
          ...updateData,
          date: updateData.date instanceof Date 
            ? updateData.date 
            : new Date(updateData.date),
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

