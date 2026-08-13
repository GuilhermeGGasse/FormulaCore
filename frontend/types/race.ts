export enum CircuitType {
  STREET = "STREET",
  PERMANENT = "PERMANENT",
}

export interface Race{
    id: number;
    name: string;
    round: number;
    circuitType: CircuitType | null;
    length: number | null;
    laps: number | null;
    season: number | null;
    date: string | null;
    country: string | null;
    //result
};