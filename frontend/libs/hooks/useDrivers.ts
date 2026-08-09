// libs/hooks/useDrivers.ts

import { useQuery } from "@tanstack/react-query";
import { getDrivers, getDriverById } from "../api/drivers";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDriver, updateDriver, deleteDriver } from "@/libs/api/drivers";
import { DriverFormData } from "@/libs/schemas/driverSchema";

export function useDrivers() {
  return useQuery({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });
}

export function useDriver(id: number) {
  return useQuery({
    queryKey: ["drivers", id],
    queryFn: () => getDriverById(id),
  });
}
export function useCreateDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: DriverFormData) => createDriver(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["drivers"] });
        },
    });
}
export function useUpdateDriver(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: DriverFormData) => updateDriver(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["drivers"] });
        },
    });
}
export function useDeleteDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteDriver(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["drivers"] });
        },
    });
}