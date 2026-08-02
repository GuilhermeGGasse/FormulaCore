// libs/api/races.ts

import { apiFetch } from "./client";
import { CircuitType, Race } from "../../types/race";

export async function getRaces(): Promise<Race[]> {
    return apiFetch<Race[]>("/races");
}
export async function getRaceById(id: number): Promise<Race> {
    return apiFetch<Race>(`/races/${id}`);
}
export async function getRacesByCountry(country: string): Promise<Race[]> {
    return apiFetch<Race[]>(`/races/country/${country}`);
}
export async function getRacesBySeason(season: number): Promise<Race[]> {
    return apiFetch<Race[]>(`/races/season/${season}`);
}
export async function getRacesByCircuitType(circuitType: CircuitType): Promise<Race[]> {
    return apiFetch<Race[]>(`/races/circuitType/${circuitType}`);
}

export function createRace(data: Omit<Race, "id">): Promise<Race> {
  return apiFetch<Race>("/races", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export function updateRace(id: number, data: Partial<Omit<Race, "id">>): Promise<Race> {
  return apiFetch<Race>(`/races/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
export function deleteRace(id: number): Promise<void> {
  return apiFetch<void>(`/races/${id}`, {
    method: "DELETE",
  });
}