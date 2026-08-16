// scripts/ingest.ts
import { runIngestion } from "../src/services/ingestion/runIngestion.js";

const [startYear, endYear] = process.argv.slice(2).map(Number);

if (!startYear || !endYear) {
  console.error("Uso: npm run ingest -- <startYear> <endYear>");
  process.exit(1);
}

runIngestion(startYear, endYear)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Ingestão falhou:", error);
    process.exit(1);
  });