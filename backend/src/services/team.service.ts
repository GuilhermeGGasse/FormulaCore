import { carModel } from "../models/car.model.js";
import { driverModel } from "../models/driver.model.js";
import { resultModel } from "../models/result.model.js";
import { teamModel } from "../models/team.model.js";
import { ConflictError } from "../errors/conflictError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ValidationError } from "../errors/validationError.js";

export const teamService =
{
    getallTeams: () => {
        const teams = teamModel.findAll();
        return teams;
    },
    getTeamById: async (id: number) => {
        const team = teamModel.findById(id);
        if (!team) {
            throw new NotFoundError("Team not found.");
        }
        return team;
    },
    createTeam: async (data: { name: string }) => {
        const teamName = await teamModel.findByName(data.name);
        if (teamName) {
            throw new ConflictError("Team already exists.");
        }
        return teamModel.create(data);
    },
    updateTeam: async (id: number, data: { name: string }) => {
        const team = await teamModel.findById(id);
        if (!team) {
            throw new NotFoundError("Team not found.");
        }
        const teamName = await teamModel.findByName(data.name);
        if (teamName) {
            throw new ConflictError("Team already exists.");
        }
        if (data == undefined) {
            throw new ValidationError("None field passed.");
        }
        return teamModel.update(id, data);
    },
    deleteTeam: async (id:number) =>
    {
        const team = await teamModel.findById(id);
        if (!team) {
            throw new Error("Team not found.");
        }
        const results = await resultModel.findByFilters(id);
        if(results.length>0)
        {
            throw new ConflictError("Cannot delete a driver with existing results.");
        }
        const drivers = await driverModel.findByTeam(id);
        if(drivers.length>0)
        {
            throw new ConflictError("Cannot delete a driver with existing drivers.");
        }
        const cars = await carModel.findByTeam(id);
        if(cars.length>0)
        {
            throw new ConflictError("Cannot delete a driver with existing cars.");
        }
        return teamModel.delete(id);
    }
}