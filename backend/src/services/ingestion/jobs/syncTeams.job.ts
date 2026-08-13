// syncTeams.job.ts
import { jolpicaClient } from "../jolpica.client.js";
import { mapJolpicaTeam } from "../mappers/team.mapper.js";
import { prisma } from "../../../utils/prisma-central.js";

export async function syncTeams(season: number) {
  const jolpicaTeams = await jolpicaClient.getConstructors(season);

  let synced = 0;

  for (const jolpicaTeam of jolpicaTeams) {
    const teamData = mapJolpicaTeam(jolpicaTeam);

    if (!teamData.jolpicaId) {
      console.warn(`Team without jolpicaId skipped: ${teamData.name}`);
      continue;
    }

    await prisma.team.upsert({
      where: { jolpicaId: teamData.jolpicaId },
      update: teamData,
      create: teamData,
    });

    synced++;
  }

  console.log(`[syncTeams] Season ${season}: ${synced} teams synced`);
  return synced;
}