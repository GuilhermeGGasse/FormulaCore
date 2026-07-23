import type { FastifyReply, FastifyRequest } from "fastify";
import { carService } from "../services/car.service.js";

export class CarController {
    async getAllCars(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const cars = carService.getAllCars();
        return reply.status(200).send(cars);
    }
    async getCarById(
        request: FastifyRequest<{
            Params: {
                id: number;
            };
        }>,
        reply: FastifyReply
    ) {
        const { id } = request.params;
        const car = await carService.getCarById(id);
        return reply.status(200).send(car);
    }
    async getCarsByEngine(request: FastifyRequest<{
        Params: {
            engineSupplier: string;
        };
    }>,
        reply: FastifyReply) {
        const { engineSupplier } = request.params;
        const cars = await carService.getCarsByEngine(engineSupplier);
        return reply.status(200).send(cars);
    }
    async getCarsBySeason(request: FastifyRequest<{
        Params: {
            season: number;
        };
    }>,
        reply: FastifyReply) {
        const { season } = request.params;
        const cars = await carService.getCarsBySeason(season);
        return reply.status(200).send(cars);
    }
    async getCarsByTeam(request: FastifyRequest<{
        Params: {
            teamId: number;
        };
    }>,
        reply: FastifyReply) {
        const { teamId } = request.params;
        const cars = await carService.getCarsByTeam(teamId);
        return reply.status(200).send(cars);
    }
    async createCar(request: FastifyRequest<{
        Body: {
            chassisName: string,
            engineSupplier: string,
            power: number,
            weight: number,
            season: number,
            teamId: number
        };
    }>, reply: FastifyReply) {
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
    }
    async updateCar(
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
        reply: FastifyReply) {
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
    }
    async deleteCar(
            request: FastifyRequest<{
                Params: {
                    id: number;
                };
            }>,
            reply: FastifyReply
        ) {
            const { id } = request.params;
            await carService.deleteCar(id);
            return reply.status(204).send();
        }
}