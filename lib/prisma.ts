import { PrismaClient } from "@prisma/client";

/**
 * Global type to prevent multiple Prisma instances
 * during hot reload in development
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma Client Singleton
 *
 * Why this exists:
 * - Next.js hot reload creates new instances repeatedly
 * - This prevents connection exhaustion in development
 * - Ensures a single DB connection pool is reused
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Optional logging (useful in development)
    log: ["error", "warn"],
  });

/**
 * In development, store Prisma instance globally
 * so it survives hot reloads
 */
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}