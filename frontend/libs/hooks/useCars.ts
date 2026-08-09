import { useQuery } from "@tanstack/react-query";
import {getCars, getCarById, getCarsByEngine, getCarsBySeason, getCarsByTeam} from "../api/cars";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {createCar, updateCar, deleteCar} from "@/libs/api/cars";
import { CarFormData } from "@/libs/schemas/carSchema";

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

export function useCreateCar() {
     const queryClient = useQueryClient();

     return useMutation({
        mutationFn: (data: CarFormData) => createCar(data),
        onSuccess: () =>
        {
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
     });
}
export function useUpdateCar(id: number) {
     const queryClient = useQueryClient();

     return useMutation({
        mutationFn: (data: CarFormData) => updateCar(id, data),
        onSuccess: () =>
        {
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
     });
}
export function useDeleteCar() {
     const queryClient = useQueryClient();

     return useMutation({
        mutationFn: (id:number) => deleteCar(id),
        onSuccess: () =>
        {
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
     });
}


