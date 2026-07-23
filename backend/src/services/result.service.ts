import { driverModel } from "../models/driver.model.js";
import { raceModel } from "../models/race.model.js";
import { resultModel } from "../models/result.model.js"
import { teamModel } from "../models/team.model.js";

export const resultService = {
    getAllResults: () => {
        const results = resultModel.findAll();
        return results;
    },
    getResultById: async (id: number) => {
        const result = await resultModel.findById(id);
        if (!result) {
            throw new Error("result not found.");
        }
        return result;
    },
    getResultsByDriver: async (driverId: number) => {
        const driver = await resultModel.findById(driverId);
        if (!driver) {
            throw new Error("Driver not found.");
        }
        const resultsperDriver = resultModel.findByFilters(driverId);
        return resultsperDriver;
    },
    getResultsByTeam: async (teamId: number) => {
        const team = await resultModel.findById(teamId);
        if (!team) {
            throw new Error("team not found.");
        }
        const resultsperTeam = resultModel.findByFilters(teamId);
        return resultsperTeam;
    },
    getResultsBySeason: async (season: number) => {
        const season_ = await resultModel.findById(season);
        if (!season_) {
            throw new Error("season not found.");
        }
        const resultsperSeason = resultModel.findByFilters(season);
        return resultsperSeason;
    },
    getResultsByRace: async (raceId: number) => {
        const race = await resultModel.findById(raceId);
        if (!raceId) {
            throw new Error("race not found.");
        }
        const resultsperRace = resultModel.findByFilters(raceId);
        return resultsperRace;
    },
    createResult: async (data: { position: number, points: number, laps: number, status: string, raceId: number, driverId: number, teamId: number }) => {
        const race = await raceModel.findById(data.raceId);
        if (!race) {
            throw new Error("race not found.");
        }
        const driver = await driverModel.findById(data.driverId);
        if (!driver) {
            throw new Error("driver not found.");
        }
        const team = await teamModel.findById(data.teamId);
        if (!team) {
            throw new Error("team not found.");
        }
        if (driver.teamId !== data.teamId) {
            throw new Error("Driver does not belong to the specified team.");
        }
        if (data.position <= 0) {
            throw new Error("Invalid value.");
        }
        const result = await resultModel.findByFilters(data.driverId, data.raceId);
        if (result.length > 0) {
            throw new Error("Result already exists.");
        }
        return resultModel.create(data);
    },//Precisa adicionar possibilidade de mudança para teamId, driverId e raceId com suas validações.
    updateResult: async (id: number, data: { position?: number, points?: number, laps?: number, status?: string }) => {
        const result = await resultModel.findById(id);
        if (!result) {
            throw new Error("result not found.");
        }
        if (data.position == undefined && data.points == undefined && data.laps == undefined && data.status == undefined) {
            throw new Error("None field passed.");
        }
        return resultModel.update(id, data);
    },
    deleteResult: async (id:number) =>
    {
        const result = await resultModel.findById(id);
        if(!result)
        {
            throw new Error("result not found.");
        }
        return resultModel.delete(id);
    }
}