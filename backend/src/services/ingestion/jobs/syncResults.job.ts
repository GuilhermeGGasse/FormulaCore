// syncResults.job.ts
import { jolpicaClient } from "../jolpica.client.js";
import { mapJolpicaResult } from "../mappers/result.mapper.js";
import { prisma } from "../../../utils/prisma-central.js";

export async function syncResults(season: number) {
  const races = await prisma.race.findMany({
    where: { season },
    select: { id: true, round: true, name: true },
  });

  let synced = 0;

  for (const race of races) {
    if (!race.round) {
      console.warn(`Race without round skipped: ${race.name}`);
      continue;
    }

    const jolpicaResults = await jolpicaClient.getResults(season, race.round);

    for (const jolpicaResult of jolpicaResults) {
      try {
        const resultData = await mapJolpicaResult(jolpicaResult, race.id);

        await prisma.result.upsert({
          where: {
            raceId_driverId: {
              raceId: resultData.raceId,
              driverId: resultData.driverId,
            },
          },
          update: resultData,
          create: resultData,
        });

        synced++;
      } catch (error) {
        console.warn(`Result skipped for race ${race.name}: ${(error as Error).message}`);
      }
    }
  }

  console.log(`[syncResults] Season ${season}: ${synced} results synced`);
  return synced;
}
