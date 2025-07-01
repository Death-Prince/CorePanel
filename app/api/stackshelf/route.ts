// app/api/stackshelf/route.ts

import { getStackItemModel } from "@/models/StackItem";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const StackItem = await getStackItemModel();
    const items = await StackItem.find();
    return NextResponse.json({ success: true, data: items });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const StackItem = await getStackItemModel();

    const created = await StackItem.create(body);

    return NextResponse.json({ success: true, data: created });
  } catch (err) {
    console.error("Error in POST /api/stackshelf:", err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const StackItem = await getStackItemModel();

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Missing item ID in request body." },
        { status: 400 }
      );
    }

    const updated = await StackItem.findByIdAndUpdate(body.id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Item not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("Error in PUT /api/stackshelf:", err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const StackItem = await getStackItemModel();

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Missing item ID." },
        { status: 400 }
      );
    }

    const deleted = await StackItem.findByIdAndDelete(body.id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Item not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error in DELETE /api/stackshelf:", err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
