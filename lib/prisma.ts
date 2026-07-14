import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: "localhost",
  port: 3306,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
