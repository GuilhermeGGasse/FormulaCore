//
type JolpicaTeam = {
    name: string;
    constructorId: string;
};

export function mapJolpicaTeam(jolpicaTeam: JolpicaTeam) {
    return{
       name: jolpicaTeam.name,
       jolpicaId: jolpicaTeam.constructorId
    };
}
