"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
exports.prismaClient = new client_1.PrismaClient({
    log: ["query"], // Enables query logging for debugging
    datasources: {
        db: {
            url: process.env.DATABASE_URL + "?pgbouncer=true&statement_cache_size=0", // Adjusts settings for PgBouncer
        },
    },
});
