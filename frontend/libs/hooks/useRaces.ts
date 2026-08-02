import { useQuery } from "@tanstack/react-query";
import { getRaces, getRaceById, getRacesByCountry, getRacesByCircuitType, getRacesBySeason } from "../api/races";
import { CircuitType } from "@/types/race";

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

