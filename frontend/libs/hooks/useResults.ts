// libs/hooks/useResults.ts

import { useQuery } from "@tanstack/react-query";
import { getResults, getResultById, getResultsByDriver, getResultsByRace, getResultsBySeason, getResultsByTeam, createResult, updateResult, deleteResult } from "../api/results";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRace, updateRace, deleteRace } from "@/libs/api/races";
import { RaceFormData } from "@/libs/schemas/raceSchema";
import { ResultFormData } from "../schemas/resultSchema";

export function useResults() {
    return useQuery({
        queryKey: ["results"],
        queryFn: getResults,
    });
}
export function useResult(id: number) {
    return useQuery({
        queryKey: ["results", id],
        queryFn: () => getResultById(id),
    });
}
export function useResultByDriver(driverId: number) {
    return useQuery({
        queryKey: ["results", driverId],
        queryFn: () => getResultsByDriver(driverId),
    });
}
export function useResultByRace(raceId: number) {
    return useQuery({
        queryKey: ["results", raceId],
        queryFn: () => getResultsByRace(raceId),
    });
}
export function useResultBySeason(season: number) {
    return useQuery({
        queryKey: ["results", season],
        queryFn: () => getResultsBySeason(season),
    });
}
export function useResultByTeam(teamId: number) {
    return useQuery({
        queryKey: ["results", teamId],
        queryFn: () => getResultsByTeam(teamId),
    });
}

export function useCreateResult() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ResultFormData) => createResult(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["results"] });
        },
    });
}
export function useUpdateResult(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ResultFormData) => updateResult(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["results"] });
        },
    });
}
export function useDeleteResult() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteResult(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["results"] });
        },
    });
}