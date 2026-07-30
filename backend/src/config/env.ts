// backend/src/config/env.ts
import "dotenv/config";

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  databaseUrl: getEnvVar("DATABASE_URL"),
  port: Number(process.env.PORT) || 3333,
  jolpicaBaseUrl: process.env.JOLPICA_BASE_URL || "https://api.jolpi.ca/ergast/f1",
};