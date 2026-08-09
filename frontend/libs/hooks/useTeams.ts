import { useQuery } from "@tanstack/react-query";
import {getTeams, getTeamById} from "../api/teams";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeam, updateTeam, deleteTeam } from "@/libs/api/teams"; // ⚠️ ajustar path e conferir se createTeam/deleteTeam existem no seu teams.ts
import { TeamFormData } from "@/libs/schemas/teamSchema";

export function useTeams() {
    return useQuery({
        queryKey: ["teams"],
        queryFn: getTeams,
    });
}
export function useTeam(id: number) {
    return useQuery({
        queryKey: ["teams", id],
        queryFn: () => getTeamById(id),
    });
}

// libs/hooks/useTeams.ts (adições — mantém os useQuery já existentes)

export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeamFormData) => createTeam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
}

export function useUpdateTeam(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeamFormData) => updateTeam(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTeam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
}