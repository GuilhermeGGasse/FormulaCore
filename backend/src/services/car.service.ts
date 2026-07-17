import { carModel } from "../models/car.model.js"

export const carService =
{
    getAllCars: () => {
        const cars = carModel.findAll();
        return cars;
    },
    getCarById: async (id: number) => {
        const car = await carModel.findById(id);
        if (!car) {
            throw new Error("car not found.");
        }
        return car;
    },
    getCarByEngine: async (enginesupply: string) => {
        const cars = await carModel.findByFilters(enginesupply);
        if (!cars) {
            throw new Error("cars not found.");
        }
        return cars;
    },
    getCarBySeason: async (season: number) => {
        const cars = await carModel.findByFilters(undefined, season);
        if (!cars) {
            throw new Error("cars not found.");
        }
        return cars;
    },
    getCarByTeam: async (teamId: number) => {
        const cars = await carModel.findByFilters(undefined, teamId);
        if (!cars) {
            throw new Error("cars not found.");
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
            throw new Error("car not found.");
        }
        if (data.chassisName == undefined && data.engineSupplier == undefined && data.power == undefined && data.season == undefined && data.teamId == undefined && data.weight == undefined) {
            throw new Error("None field passed.");
        }
        if (data.power !== undefined && data.power <= 0) {
            throw new Error("Invalid value.");
        }
        if (data.weight !== undefined && data.weight <= 0) {
            throw new Error("Invalid value.");
        }
        if (data.season !== undefined && (data.season <= 1950 || data.season >= 2026 + 1)) {
            throw new Error("Invalid season.");
        }
        return carModel.update(id, data)
    },
    deleteCar: async (id: number) => {
        const car = await carModel.findById(id);
        if (!car) {
            throw new Error("Driver not found.");
        }
        return carModel.delete(id);
    }
}