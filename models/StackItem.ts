// models/StackItem.ts
import { connectStackshelfDB } from "@/lib/mongooseStackshelf";
import mongoose from "mongoose";

const StackItemSchema = new mongoose.Schema(
  {
    category_name: String,
    site_name: String,
    site_link: String,
    site_image: String,
    access_category: String,
    ribon_style: String,
    ribon_color: String,
    ribon_tooltip: String,
  },
  {
    timestamps: true,
    collection: "tools",
  }
);

export async function getStackItemModel() {
  const db = await connectStackshelfDB();
  return db.models["StackItem"] || db.model("StackItem", StackItemSchema);
}
