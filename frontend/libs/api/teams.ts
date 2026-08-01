// libs/api/teams.ts
import { apiFetch } from "./client";
import {Team} from "../../types/team";

export async function getTeams(): Promise<Team[]> {
    return apiFetch<Team[]>("/teams");
}
export async function getTeamById(id: number): Promise<Team> {
    return apiFetch<Team>(`/races/${id}`);
}

export function createTeam(data: Omit<Team, "id">): Promise<Team> {
  return apiFetch<Team>("/teams", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export function updateTeam(id: number, data: { name: string }): Promise<Team> {
  return apiFetch<Team>(`/teams/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
export function deleteTeam(id: number): Promise<void> {
  return apiFetch<void>(`/races/${id}`, {
    method: "DELETE",
  });
}
