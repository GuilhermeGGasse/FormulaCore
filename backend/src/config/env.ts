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
};