import { PrismaClient } from "@prisma/client";
import { error } from "console";
import "server-only";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({ log: ["error"] });
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
