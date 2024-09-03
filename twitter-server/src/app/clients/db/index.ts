import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient({
  log: ["query"], // Enables query logging for debugging
  datasources: {
    db: {
      url: process.env.DATABASE_URL + "?pgbouncer=true&statement_cache_size=0", // Adjusts settings for PgBouncer
    },
  },
});
