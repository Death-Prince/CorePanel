import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_STACKSHELF_URI as string;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_STACKSHELF_URI");
}

const cached = global.mongooseStackshelf || {
  conn: null as mongoose.Connection | null,
  promise: null as Promise<mongoose.Connection> | null,
};

export async function connectStackshelfDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.createConnection(MONGODB_URI, {
      bufferCommands: false,
    }).asPromise();
  }

  cached.conn = await cached.promise;
  global.mongooseStackshelf = cached;

  return cached.conn;
}
