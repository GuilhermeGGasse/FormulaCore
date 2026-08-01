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
    date: Date | null;
    country: number | null;
    //result
};