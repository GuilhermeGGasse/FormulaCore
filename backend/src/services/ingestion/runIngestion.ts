// runIngestion.ts
import { syncTeams } from "./jobs/syncTeams.job.js";
import { syncDrivers } from "./jobs/syncDrivers.job.js";
import { syncRaces } from "./jobs/syncRaces.job.js";
import { syncResults } from "./jobs/syncResults.job.js";

const DELAY_MS = 700; // throttle entre chamadas, evita estourar rate limit da Jolpica

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type SeasonSummary = {
  season: number;
  success: boolean;
  error?: string;
};

export async function runIngestion(startYear: number, endYear: number) {
  const summary: SeasonSummary[] = [];

  for (let season = startYear; season <= endYear; season++) {
    console.log(`\n=== Iniciando ingestão da temporada ${season} ===`);

    try {
      await syncTeams(season);
      await delay(DELAY_MS);

      await syncDrivers(season);
      await delay(DELAY_MS);

      await syncRaces(season);
      await delay(DELAY_MS);

      await syncResults(season);
      await delay(DELAY_MS);

      summary.push({ season, success: true });
      console.log(`=== Temporada ${season} concluída com sucesso ===`);
    } catch (error) {
      const message = (error as Error).message;
      summary.push({ season, success: false, error: message });
      console.error(`=== Temporada ${season} falhou: ${message} ===`);
    }
  }

  const succeeded = summary.filter((s) => s.success).length;
  const failed = summary.filter((s) => !s.success);

  console.log(`\n=== Ingestão finalizada: ${succeeded}/${summary.length} temporadas com sucesso ===`);
  if (failed.length > 0) {
    console.log("Temporadas com falha:");
    failed.forEach((s) => console.log(`  - ${s.season}: ${s.error}`));
  }

  return summary;
}