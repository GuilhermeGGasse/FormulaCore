import { driverModel } from "../models/driver.model.js"
import { teamModel } from "../models/team.model.js";
import { resultModel } from "../models/result.model.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ConflictError } from "../errors/conflictError.js";
import { ValidationError } from "../errors/validationError.js";

export const driverService =
{
    getAllDrivers: () => {
        const drivers = driverModel.findAll();
        return drivers;
    },
    getDriverById: async (id: number) => {
        const driver = await driverModel.findById(id);
        if (!driver) {
            throw new NotFoundError("Driver not found.");
        }
        return driver;
    },
    createDriver: async (data: { name: string, number: number, teamId: number }) => {
        const team = await teamModel.findById(data.teamId);
        if (!team) {
            throw new NotFoundError("Team not found.");
        }
        return driverModel.create(data);
    },
    updateDriver: async (id: number, data: { name?: string, number?: number, teamId?: number }) => {
        const driver = await driverModel.findById(id);
        if (!driver) {
            throw new NotFoundError("Driver not found.");
        }
        if (data.teamId !== undefined) {
            const team = await teamModel.findById(data.teamId);
            if (!team) {
                throw new NotFoundError("Team not found.");
            }
        }
        if (data.name == undefined && data.number == undefined && data.teamId == undefined) {
            throw new ValidationError("None field passed.");
        }
        if (data.number !== undefined && data.number <= 0) {
            throw new ValidationError("Number must have positive value.");
        }
        //Ainda falta um if = se há algum outro motorista com este número.

        return driverModel.update(id, data);
    },
    deleteDriver: async (id: number) => {
        const driver = await driverModel.findById(id);
        if (!driver) {
            throw new NotFoundError("Driver not found.");
        }
        const resultsperDriver = await resultModel.findByFilters(id)
        if (resultsperDriver.length > 0) {
            throw new ConflictError("Cannot delete a driver with existing results.");
        }
        return driverModel.delete(id);
    }
}