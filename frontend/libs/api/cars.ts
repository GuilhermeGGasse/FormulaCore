// libs/api/cars.ts
import { apiFetch } from "./client";
import {Car} from "../../types/car";

export async function getCars(): Promise<Car[]> {
    return apiFetch<Car[]>("/cars");
}
export async function getCarById(id: number): Promise<Car> {
    return apiFetch<Car>(`/cars/${id}`);
}
export async function getCarsByEngine(engineSupplier:string): Promise<Car[]> {
     return apiFetch<Car[]>(`/cars/engine/${engineSupplier}`);
}
export async function getCarsBySeason(season:number): Promise<Car[]> {
     return apiFetch<Car[]>(`/cars/season/${season}`);
}
export async function getCarsByTeam(team:string): Promise<Car[]> {
     return apiFetch<Car[]>(`/cars/teams/${team}`);
}

export function createCar(data: Omit<Car, "id">): Promise<Car> {
  return apiFetch<Car>("/cars", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export function updateCar(id: number, data: Partial<Omit<Car, "id">>): Promise<Car> {
  return apiFetch<Car>("/cars", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export function deleteCar(id: number): Promise<void> {
  return apiFetch<void>(`/cars/${id}`, {
    method: "DELETE",
  });
}

