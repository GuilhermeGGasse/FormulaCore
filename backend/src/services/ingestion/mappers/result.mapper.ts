//
type JolpicaResult = {
  position: string;
  points: string;
  laps: string;
  status: string;
  Driver: {
    driverId: string;
  };
  Constructor: {
    constructorId: string;
  };
};

async function findDriverIdByJolpicaId(jolpicaDriverId: string): Promise<number> {
  throw new Error("Not implemented");
}

async function findTeamIdByJolpicaId(jolpicaConstructorId: string): Promise<number> {
  throw new Error("Not implemented");
}

export async function mapJolpicaResult(jolpicaResult: JolpicaResult, raceId: number) {
  const driverId = await findDriverIdByJolpicaId(jolpicaResult.Driver.driverId);
  const teamId = await findTeamIdByJolpicaId(jolpicaResult.Constructor.constructorId);

  return {
    position: Number(jolpicaResult.position),
    points: Number(jolpicaResult.points),
    laps: Number(jolpicaResult.laps),
    status: jolpicaResult.status,
    raceId,
    driverId,
    teamId,
  };
}

/*
**Explicação da estrutura, já que essa é a mais complexa:**

- **`JolpicaResult`** — tipo com os campos que você confirmou (`position`, `points`, `laps`, `status`) 
mais os dois objetos aninhados (`Driver`, `Constructor`), dos quais só precisamos dos respectivos IDs externos

- **`findDriverIdByJolpicaId` e `findTeamIdByJolpicaId`** — são funções **auxiliares de correlação**, 
ainda não implementadas (propositalmente, com `TODO`). Elas são o "elo perdido" entre o mundo da Jolpica 
(que usa strings tipo `"verstappen"`, `"red_bull"`) e o seu banco (que usa `id` numérico autoincrement)

- **Por que isso é o ponto mais difícil:** para essas duas funções funcionarem, 
você precisa de alguma forma de "lembrar" qual `driverId`/`constructorId` da Jolpica corresponde 
a qual `id` no seu banco. Duas estratégias possíveis:
  1. **Buscar por nome** — já que você tem `name` no seu `Driver`/`Team`, e a Jolpica 
  também fornece nome, pode buscar `driverModel.findByName(...)` equivalente 
  (frágil se houver nomes duplicados/grafias diferentes)
  2. **Guardar o ID externo da Jolpica** — adicionar um campo opcional `jolpicaId String?` 
  no `model Driver` e `model Team` (não no `Race`/`Result`), preenchido durante a ingestão 
  de `syncDrivers`/`syncTeams`, servindo como "ponte" confiável pra usar aqui depois

- **`raceId` como parâmetro extra da função** — como o `Result` também depende de `Race`, 
e você já vai ter processado a corrida antes (no `syncRaces.job.ts`), o `raceId` real 
do seu banco é passado como argumento, em vez de tentar correlacionar aqui dentro também

**Minha recomendação:** a opção 2 (guardar `jolpicaId` no `Driver` e `Team`) 
é bem mais robusta e simples de implementar do que buscar por nome — evita ambiguidade 
e torna a correlação uma busca direta (`findFirst({ where: { jolpicaId } })`). 
Vale considerar adicionar esse campo antes de implementar as duas funções `TODO`.
*/