// syncDrivers.job.ts
import { jolpicaClient } from "../jolpica.client.js";
import { mapJolpicaDriver } from "../mappers/driver.mapper.js";
import { prisma } from "../../../utils/prisma-central.js";

export async function syncDrivers(season: number) {
  const jolpicaDrivers = await jolpicaClient.getDrivers(season);

  let synced = 0;

  for (const jolpicaDriver of jolpicaDrivers) {
    const driverData = mapJolpicaDriver(jolpicaDriver);

    if (!driverData.jolpicaId) {
      console.warn(`Driver without jolpicaId skipped: ${driverData.name}`);
      continue;
    }

    await prisma.driver.upsert({
      where: { jolpicaId: driverData.jolpicaId },
      update: driverData,
      create: driverData,
    });

    synced++;
  }

  console.log(`[syncDrivers] Season ${season}: ${synced} drivers synced`);
  return synced;
}