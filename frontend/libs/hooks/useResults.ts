import { useQuery } from "@tanstack/react-query";
import { getResults, getResultById, getResultsByDriver, getResultsByRace, getResultsBySeason, getResultsByTeam } from "../api/results";

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
