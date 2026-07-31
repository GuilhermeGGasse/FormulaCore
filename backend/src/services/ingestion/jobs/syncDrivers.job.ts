import { jolpicaClient } from "../jolpica.client.js";
import { mapJolpicaDriver } from "../mappers/driver.mapper.js";
import { driverModel } from "../../../models/driver.model.js";

export async function syncDriversJob(season: number) {

    console.log(`Syncing drivers (${season})...`);

    const jolpicaDrivers = await jolpicaClient.getDrivers(season);

    let created = 0;
    let updated = 0;
    let errors = 0;

    for (const jolpicaDriver of jolpicaDrivers) {

        try {

            const mappedDriver = mapJolpicaDriver(jolpicaDriver);

            const existingDriver =
                await driverModel.findByJolpicaId(mappedDriver.jolpicaId);

            //const teamId = 1; // provisório

            if (!existingDriver) {

                await driverModel.create(
                    mappedDriver,
                );

                created++;

            } else {

                await driverModel.update(existingDriver.id, {
                    name: mappedDriver.name,
                    number: mappedDriver.number,
                    //teamId
                });

                updated++;
            }

        } catch (err) {

            errors++;

            console.error(err);

        }

    }

    console.log(`
Drivers synchronized!

Created: ${created}
Updated: ${updated}
Errors : ${errors}
`);

}