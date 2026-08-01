// libs/api/drivers.ts

import { apiFetch } from "./client";
import { Driver } from "../../types/driver";

export function getDrivers(): Promise<Driver[]> {
  return apiFetch<Driver[]>("/drivers");
}
export function getDriverById(id: number): Promise<Driver> {
  return apiFetch<Driver>(`/drivers/${id}`); 
}
// libs/api/drivers.ts (adições)

export function createDriver(data: Omit<Driver, "id">): Promise<Driver> {
  return apiFetch<Driver>("/drivers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export function updateDriver(id: number, data: Partial<Omit<Driver, "id">>): Promise<Driver> {
  return apiFetch<Driver>(`/drivers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
export function deleteDriver(id: number): Promise<void> {
  return apiFetch<void>(`/drivers/${id}`, {
    method: "DELETE",
  });
}