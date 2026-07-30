// race.mapper.ts
type JolpicaRace = {
  season: string;
  round: string;
  raceName: string;
  date: string;
  Circuit: {
    circuitName: string;
    Location: {
      country: string;
    };
  };
};

export function mapJolpicaRace(jolpicaRace: JolpicaRace) {
  return {
    name: jolpicaRace.raceName,
    season: Number(jolpicaRace.season),
    date: new Date(jolpicaRace.date),
    country: jolpicaRace.Circuit.Location.country,
  };
}