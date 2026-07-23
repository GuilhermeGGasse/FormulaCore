import { carModel } from "../models/car.model.js"
import { NotFoundError } from "../errors/NotFoundError.js";

export const carService =
{
    getAllCars: () => {
        const cars = carModel.findAll();
        return cars;
    },
    getCarById: async (id: number) => {
        const car = await carModel.findById(id);
        if (!car) {
            throw new NotFoundError("car not found.");
        }
        return car;
    },
    getCarsByEngine: async (enginesupply: string) => {
        const cars = await carModel.findByFilters(enginesupply);
        if (!cars) {
            throw new NotFoundError("cars not found.");
        }
        return cars;
    },
    getCarsBySeason: async (season: number) => {
        const cars = await carModel.findByFilters(undefined, season);
        if (!cars) {
            throw new NotFoundError("cars not found.");
        }
        return cars;
    },
    getCarsByTeam: async (teamId: number) => {
        const cars = await carModel.findByFilters(undefined, teamId);
        if (!cars) {
            throw new NotFoundError("cars not found.");
        }
        return cars;
    },
    createCar: async (data: {chassisName: string, engineSupplier: string, power: number, weight: number, season: number, teamId: number}) =>
    {
        return carModel.create(data);
    },

    updateCar: async (id: number, data: { chassisName?: string, engineSupplier?: string, power?: number, weight?: number, season?: number, teamId?: number }) => {
        const car = await carModel.findById(id);
        if (!car) {
            throw new NotFoundError("car not found.");
        }
        if (data.chassisName == undefined && data.engineSupplier == undefined && data.power == undefined && data.season == undefined && data.teamId == undefined && data.weight == undefined) {
            throw new NotFoundError("None field passed.");
        }
        if (data.power !== undefined && data.power <= 0) {
            throw new NotFoundError("Invalid value.");
        }
        if (data.weight !== undefined && data.weight <= 0) {
            throw new NotFoundError("Invalid value.");
        }
        if (data.season !== undefined && (data.season <= 1950 || data.season >= 2026 + 1)) {
            throw new NotFoundError("Invalid season.");
        }
        return carModel.update(id, data)
    },
    deleteCar: async (id: number) => {
        const car = await carModel.findById(id);
        if (!car) {
            throw new NotFoundError("Driver not found.");
        }
        return carModel.delete(id);
    }
}