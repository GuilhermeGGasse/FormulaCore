import type { FastifyReply, FastifyRequest } from "fastify";
import { carService } from "../services/car.service.js";

export const CarController = {
    getAllCars: async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const cars = carService.getAllCars();
        return reply.status(200).send(cars);
    },
    getCarById: async (
        request: FastifyRequest<{
            Params: {
                id: number;
            };
        }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params;
        const car = await carService.getCarById(id);
        return reply.status(200).send(car);
    },
    getCarsByEngine: async (request: FastifyRequest<{
        Params: {
            engineSupplier: string;
        };
    }>,
        reply: FastifyReply) => {
        const { engineSupplier } = request.params;
        const cars = await carService.getCarsByEngine(engineSupplier);
        return reply.status(200).send(cars);
    },
    getCarsBySeason: async (request: FastifyRequest<{
        Params: {
            season: number;
        };
    }>,
        reply: FastifyReply) => {
        const { season } = request.params;
        const cars = await carService.getCarsBySeason(season);
        return reply.status(200).send(cars);
    },
    getCarsByTeam: async (request: FastifyRequest<{
        Params: {
            teamId: number;
        };
    }>,
        reply: FastifyReply) => {
        const { teamId } = request.params;
        const cars = await carService.getCarsByTeam(teamId);
        return reply.status(200).send(cars);
    },
    createCar: async (request: FastifyRequest<{
        Body: {
            chassisName: string,
            engineSupplier: string,
            power: number,
            weight: number,
            season: number,
            teamId: number
        };
    }>, reply: FastifyReply) => {
        const { chassisName, engineSupplier, power, weight, season, teamId } = request.body;

        const car = await carService.createCar({
            chassisName,
            engineSupplier,
            power,
            weight,
            season,
            teamId
        })
        return reply.status(201).send(car);
    },
    updateCar: async (
        request: FastifyRequest<{
            Params: {
                id: number;
            };
            Body: {
                chassisName?: string,
                engineSupplier: string,
                power: number,
                weight: number,
                season: number,
                teamId: number
            };
        }>,
        reply: FastifyReply) => {
        const { id } = request.params;
        const { chassisName, engineSupplier, power, weight, season, teamId } = request.body;
        const car = await carService.updateCar(
            id,
            {
                chassisName,
                engineSupplier,
                power,
                weight,
                season,
                teamId

            }
        );
        return reply.status(200).send(car);
    },
    deleteCar: async (
        request: FastifyRequest<{
            Params: {
                id: number;
            };
        }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params;
        await carService.deleteCar(id);
        return reply.status(204).send();
    }
}