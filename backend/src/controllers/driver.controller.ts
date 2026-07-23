import type { FastifyReply, FastifyRequest } from "fastify";
import { driverService } from "../services/driver.service.js";

export const DriverController = {
    getAllDrivers: async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const drivers = driverService.getAllDrivers();
        return reply.status(200).send(drivers);
    },
    getDriverById: async (
        request: FastifyRequest<{
            Params: {
                id: number;
            };
        }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params;
        const driver = await driverService.getDriverById(id);
        return reply.status(200).send(driver);
    },
    createDriver: async (request: FastifyRequest<{
        Body: {
            name: string;
            number: number;
            teamId: number;
        };
    }>, reply: FastifyReply) => {
        const { name, number, teamId } = request.body;

        const driver = await driverService.createDriver({
            name,
            number,
            teamId
        });
        return reply.status(201).send(driver);
    },
    updateDriver: async (
        request: FastifyRequest<{
            Params: {
                id: number;
            };
            Body: {
                name?: string;
                number?: number;
                teamId?: number;
            };
        }>,
        reply: FastifyReply
    ) => {

        const { id } = request.params;
        const { name, number, teamId } = request.body;

        const driver = await driverService.updateDriver(
            id,
            {
                name,
                number,
                teamId
            }
        );

        return reply.status(200).send(driver);
    },
    deleteDriver: async (
        request: FastifyRequest<{
            Params: {
                id: number;
            };
        }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params;

        await driverService.deleteDriver(id);

        return reply.status(204).send();
    }
}