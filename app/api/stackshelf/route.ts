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
      { success: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

