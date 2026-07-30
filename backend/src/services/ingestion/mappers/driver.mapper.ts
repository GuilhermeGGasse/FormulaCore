//
type JolpicaDriver = {
    givenName: string;
    familyName: string;
    permanentNumber: string;
    //dateOfBirth: string;
    //nationality: string;
};

export function mapJolpicaDriver(jolpicaDriver: JolpicaDriver) {
    return{
        name: jolpicaDriver.givenName + jolpicaDriver.familyName,
        //familyName: JolpicaDriver.familyName,
        number: Number(jolpicaDriver.permanentNumber)
        //teamId
        //date: new Date(jolpicaDriver.dateOfBirth)
        //nationality: JolpicaDriver.nationality,
    };
}
