// lib/prisma.js

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Neon serverless configuration
neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = true;

// Get database connection string
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

// Create Neon adapter
const adapter = new PrismaNeon({
  connectionString,
});

// Prevent multiple Prisma instances during development
const globalForPrisma = globalThis;

// Create Prisma client
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

// Store Prisma instance globally in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;