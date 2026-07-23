import type { FastifyReply, FastifyRequest } from "fastify";
import { raceService } from "../services/race.service.js";
import type { CircuitType } from "@prisma/client";

export class RaceController {
    async getAllRaces(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const races = raceService.getallRaces();
        return reply.status(200).send(races);
    }
    async getRacesById(request: FastifyRequest<{
        Params: {
            id: number;
        };
    }>,
        reply: FastifyReply) {
        const { id } = request.params;
        const race = await raceService.getRaceById(id);
        return reply.status(200).send(race);
    }
    async getRacesByCountry(request: FastifyRequest<{
        Params: {
            country: string;
        };
    }>,
        reply: FastifyReply) {
        const { country } = request.params;
        const races = await raceService.getRacesByCountry(country);
        return reply.status(200).send(races);
    }
    async getRacesBySeason(request: FastifyRequest<{
        Params: {
            season: string;
        };
    }>,
        reply: FastifyReply) {
        const { season } = request.params;
        const races = await raceService.getRacesByCountry(season);
        return reply.status(200).send(races);
    }
    async getRacesByCircuitType(request: FastifyRequest<{
        Params: {
            circuitType: CircuitType;
        };
    }>,
        reply: FastifyReply) {
        const { circuitType } = request.params;
        const races = await raceService.getRacesByCountry(circuitType);
        return reply.status(200).send(races);
    }
    async createRace(
        request: FastifyRequest<{
            Body: {
                name: string,
                circuitType: CircuitType,
                length: number,
                laps: number,
                season: number
                date: Date,
                country: string
            };
        }>, reply: FastifyReply
    ) {
        const { name, circuitType, length, laps, season, date, country } = request.body;

        const race = await raceService.createRace({
            name,
            circuitType,
            length,
            laps,
            season,
            date,
            country
        })
        return reply.status(201).send(race);
    }
    async updateRace(request: FastifyRequest<{
        Params: {
            id: number;
        };
        Body: {
            name?: string,
            circuitType?: CircuitType,
            length?: number,
            laps?: number,
            season?: number
            date?: Date,
            country?: string
        };
    }>, reply: FastifyReply) {
        const { id } = request.params;
        const { name, circuitType, length, laps, season, date, country } = request.body;
        const race = await raceService.updateRace(id,
            {
                name, circuitType, length, laps, season, date, country
            }
        );
        return reply.status(200).send(race);
    }
    async deleteRace(request: FastifyRequest<{
        Params: {
            id: number;
        };
    }>,
        reply: FastifyReply) {
        const { id } = request.params;
        await raceService.deleteRace(id);
        return reply.status(204).send();
    }
}