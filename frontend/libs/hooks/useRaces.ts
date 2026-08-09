import { useQuery } from "@tanstack/react-query";
import { getRaces, getRaceById, getRacesByCountry, getRacesByCircuitType, getRacesBySeason } from "../api/races";
import { CircuitType } from "@/types/race";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRace, updateRace, deleteRace } from "@/libs/api/races";
import { RaceFormData } from "@/libs/schemas/raceSchema";

export function useRaces() {
    return useQuery({
        queryKey: ["races"],
        queryFn: getRaces,
    });
}
export function useRace(id: number) {
    return useQuery({
        queryKey: ["races", id],
        queryFn: () => getRaceById(id),
    });
}
export function useRacesByCountry(country: string) {
    return useQuery({
        queryKey: ["races", country],
        queryFn: () => getRacesByCountry(country),
    });
}
export function useRacesByCircuitType(circuitType: CircuitType) {
    return useQuery({
        queryKey: ["races", circuitType],
        queryFn: () => getRacesByCircuitType(circuitType),
    });
}
export function useRacesBySeason(season: number) {
    return useQuery({
        queryKey: ["races", season],
        queryFn: () => getRacesBySeason(season),
    });
}

export function useCreateRace() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RaceFormData) => createRace(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
    });
}
export function useUpdateRace(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RaceFormData) => updateRace(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["races"] });
        },
    });
}
export function useDeleteRace() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteRace(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["races"] });
        },
    });
}

