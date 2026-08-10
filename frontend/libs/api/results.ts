// libs/api/results.ts
import { apiFetch } from "./client";
import {Result} from "../../types/result";
import { ResultFormData } from "../schemas/resultSchema";

export async function getResults(): Promise<Result[]> {
    return apiFetch<Result[]>("/results");
}
export async function getResultById(id: number): Promise<Result> {
    return apiFetch<Result>(`/results/${id}`);
}
export async function getResultsByDriver(driverId: number): Promise<Result[]> {
    return apiFetch<Result[]>(`/results/drivers/${driverId}`);
}
export function getResultsByTeam(teamId: number): Promise<Result[]> {
  return apiFetch<Result[]>(`/results/teams/${teamId}`);
}
export function getResultsBySeason(season: number): Promise<Result[]> {
  return apiFetch<Result[]>(`/results/seasons/${season}`);
}
export function getResultsByRace(raceId: number): Promise<Result[]> {
  return apiFetch<Result[]>(`/results/races/${raceId}`);
}

export function createResult(data: ResultFormData): Promise<Result> {
  return apiFetch<Result>("/results", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export function updateResult(id: number, data: Partial<Omit<Result, "id">>): Promise<Result> {
  return apiFetch<Result>(`/results/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
export function deleteResult(id: number): Promise<void> {
  return apiFetch<void>(`/results/${id}`, {
    method: "DELETE",
  });
}

