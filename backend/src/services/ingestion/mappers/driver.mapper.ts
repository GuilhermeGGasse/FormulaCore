//driver.mapper.ts
type JolpicaDriver = {
    givenName: string;
    familyName: string;
    permanentNumber: string;
    //dateOfBirth: string;
    //nationality: string;
    driverId: string
};

export function mapJolpicaDriver(jolpicaDriver: JolpicaDriver) {
    return{
        name: `${jolpicaDriver.givenName} ${jolpicaDriver.familyName}`,
        //familyName: JolpicaDriver.familyName,
        number: jolpicaDriver.permanentNumber ? Number(jolpicaDriver.permanentNumber) : null,
        //teamId
        //date: new Date(jolpicaDriver.dateOfBirth)
        //nationality: JolpicaDriver.nationality,
        jolpicaId: jolpicaDriver.driverId,
    };
}
