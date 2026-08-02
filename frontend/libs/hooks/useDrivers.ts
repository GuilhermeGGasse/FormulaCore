// libs/hooks/useDrivers.ts

import { useQuery } from "@tanstack/react-query";
import { getDrivers, getDriverById } from "../api/drivers"; // ⚠️ ajustar path conforme sua estrutura

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