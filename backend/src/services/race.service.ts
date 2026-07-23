import type { CircuitType } from "@prisma/client";
import { raceModel } from "../models/race.model.js"
import { resultModel } from "../models/result.model.js";

export const raceService =
{
    getallRaces: () => {
        const races = raceModel.findAll();
        return races;
    },
    getRaceById: async (id: number) => {
        const race = await raceModel.findById(id);
        if (!race) {
            throw new Error("Race not found.");
        }
        return race;
    },
    getRacesByCountry: async (country: string) => {
        const races = await raceModel.findByFilters(undefined, country);
        if (!races) {
            throw new Error("Races not found.");
        }
        return races;
    },
    getRacesBySeason: async (season: number) => {
        const races = await raceModel.findByFilters(season);
        if (!races) {
            throw new Error("Races not found.");
        }
        return races;
    },
    getRacesByCircuitType: async (circuitType: CircuitType) => {
        const races = await raceModel.findByCircuitType(circuitType);
        if (!races) {
            throw new Error("Races not found.");
        }
        return races;
    },
    createRace: async (data: {
        name: string,
        circuitType: CircuitType,
        length: number,
        laps: number,
        season: number,
        date: Date,
        country: string
    }) => {
        return raceModel.create(data);
    },
    updateRace: async (id: number, data: { name?: string, circuitType?: CircuitType, length?: number, laps?: number, season?: number, date?: Date, country?: string }) => {
        const race = await raceModel.findById(id);
        if (!race) {
            throw new Error("Race not found.");
        }
        if (data.name == undefined && data.circuitType == undefined && data.length == undefined && data.laps == undefined && data.season == undefined && data.date == undefined && data.country == undefined) {
            throw new Error("None field passed.");
        }
        if (data.name !== undefined) {
            const raceName = await raceModel.findByName(data.name);
            if (raceName) {
                throw new Error("Race already exists.");
            }
        }

        return raceModel.update(id, data);
    },
    deleteRace: async (id: number) => {
        const race = await raceModel.findById(id);
        if (!race) {
            throw new Error("Race not found.");
        }
        const results = await resultModel.findByFilters(id);
        if (results.length > 0) {
            throw new Error("Cannot delete a driver with existing results.");
        }
        return raceModel.delete(id);
    }
}