import type { FastifyReply, FastifyRequest } from "fastify";
import { driverService } from "../services/driver.service.js";

export class DriverController {
    async getAllDrivers(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const drivers = driverService.getAllDrivers();
        return reply.status(200).send(drivers);
    }
    async getDriverById(
        request: FastifyRequest<{
            Params: {
                id: number;
            };
        }>,
        reply: FastifyReply
    ) {
        const { id } = request.params;
        const driver = await driverService.getDriverById(id);
        return reply.status(200).send(driver);
    }
    async createDriver(request: FastifyRequest<{
        Body: {
            name: string;
            number: number;
            teamId: number;
        };
    }>, reply: FastifyReply) {
        const { name, number, teamId } = request.body;

        const driver = await driverService.createDriver({
            name,
            number,
            teamId
        });
        return reply.status(201).send(driver);
    }
    async updateDriver(
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
    ) {

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
    }
    async deleteDriver(
        request: FastifyRequest<{
            Params: {
                id: number;
            };
        }>,
        reply: FastifyReply
    ) {
        const { id } = request.params;

        await driverService.deleteDriver(id);

        return reply.status(204).send();
    }
}