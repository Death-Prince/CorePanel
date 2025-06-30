import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_STACKSHELF_URI as string;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_STACKSHELF_URI");
}

let cached = (global as any).mongooseStackshelf || { conn: null, promise: null };

export async function connectStackshelfDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.createConnection(MONGODB_URI, {
      bufferCommands: false,
    }).asPromise();
  }

  cached.conn = await cached.promise;
  (global as any).mongooseStackshelf = cached;
  return cached.conn;
}
