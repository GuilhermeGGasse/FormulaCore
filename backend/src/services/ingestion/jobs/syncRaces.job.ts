// syncRaces.job.ts

import { jolpicaClient } from "../jolpica.client.js";
import { mapJolpicaRace } from "../mappers/race.mapper.js";
import { prisma } from "../../../utils/prisma-central.js";


export async function syncRaces(season: number) {
    const jolpicaRaces = await jolpicaClient.getRaces(season);

    let synced = 0;

    for (const jolpicaRace of jolpicaRaces) {
        const raceData = mapJolpicaRace(jolpicaRace);

        if (!raceData.round) {
            console.warn(`Race without round skipped: ${raceData.name}`);
            continue;
        }
        await prisma.race.upsert({
            where: {
                season_round: {
                    season: raceData.season,
                    round: raceData.round,
                },
            },
            update: raceData,
            create: raceData,
        });
        synced++;
    }

    console.log(`[syncRaces] Season ${season}: ${synced} races synced`);
    return synced;
}

