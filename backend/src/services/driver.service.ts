import { driverModel } from "../models/driver.model.js"
import { teamModel } from "../models/team.model.js";
import { resultModel } from "../models/result.model.js";

export const driverService =
{
    getAllDrivers: () => {
        const drivers = driverModel.findAll();
        return drivers;
    },
    getDriverById: async (id: number) => {
        const driver = await driverModel.findById(id);
        if (!driver) {
            throw new Error("Driver not found.");
        }
        return driver;
    },
    createDriver: async (data: { name: string, number: number, teamId: number }) => {
        const team = await teamModel.findById(data.teamId);
        if (!team) {
            throw new Error("Team not found.");
        }
        return driverModel.create(data);
    },
    updateDriver: async (id: number, data: { name: string, number: number, teamId: number }) => {
        const driver = await driverModel.findById(id);
        if (!driver) {
            throw new Error("Driver not found.");
        }
        const team = await teamModel.findById(data.teamId);
        if (!team) {
            throw new Error("Team not found.");
        }
        if (data.name == undefined && data.number == undefined && data.teamId == undefined) {
            throw new Error("None argument passed.");
        }
        if (data.number <= 0) {
            throw new Error("Number must have positive value.");
        }
        //Ainda falta um if = se há algum outro motorista com este número.

        return driverModel.update(id, data);
    },
    deleteDriver: async (id: number) => {
        const driver = await driverModel.findById(id);
        if (!driver) {
            throw new Error("Driver not found.");
        }
        const resultsperDriver = await resultModel.findByFilters(id)
        if (resultsperDriver.length > 0) {
            throw new Error("Cannot delete a driver with existing results.");
        }
        return driverModel.delete(id);
    }
}