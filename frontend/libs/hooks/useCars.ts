import { useQuery } from "@tanstack/react-query";
import {getCars, getCarById, getCarsByEngine, getCarsBySeason, getCarsByTeam} from "../api/cars";

export function useCars() {
    return useQuery({
        queryKey: ["cars"],
        queryFn: getCars,
    });
}
export function useCar(id: number) {
    return useQuery({
        queryKey: ["cars", id],
        queryFn: () => getCarById(id),
    });
}
export function useCarByEngine(engineSupplier: string) {
    return useQuery({
        queryKey: [engineSupplier],
        queryFn: () => getCarsByEngine(engineSupplier),
    });
}
export function useCarBySeason(season: number) {
    return useQuery({
        queryKey: [season],
        queryFn: () => getCarsBySeason(season),
    });
}

export function useCarByTeam(team: string) {
    return useQuery({
        queryKey: [team],
        queryFn: () => getCarsByTeam(team),
    });
}


