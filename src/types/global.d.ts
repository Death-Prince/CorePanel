// types/global.d.ts or just global.d.ts
import mongoose from "mongoose";

declare global {
  namespace NodeJS {
    interface Global {
      mongooseStackshelf?: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      };
    }
  }

  // Ensure globalThis has the same property
  var mongooseStackshelf: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  } | undefined;
}

export {};
