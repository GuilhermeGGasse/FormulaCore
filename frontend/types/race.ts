export enum CircuitType {
  STREET = "STREET",
  PERMANENT = "PERMANENT",
}

export interface Race{
    id: number;
    name: string;
    circuitType: CircuitType | null;
    lenght: number | null;
    laps: number | null;
    season: number | null;
    date: string | null;
    country: string | null;
    //result
};