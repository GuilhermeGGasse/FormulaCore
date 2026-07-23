import type { FastifyReply, FastifyRequest } from "fastify";
import { resultService } from "../services/result.service.js";
//utiliza driver, race e team

export const ResultController = {
    getAllResults: async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const results = resultService.getAllResults();
        return reply.status(200).send(results);
    },
    getResultById: async (request: FastifyRequest<{
        Params: {
            id: number;
        };
    }>,
        reply: FastifyReply) => {
        const { id } = request.params;
        const result = await resultService.getResultById(id);
        return reply.status(200).send(result);
    },
    //getResultByDriver
    //getResultByTeam
    //getResultsBySeason
    //getResultsByRace
    getResultsByDriver: async (request: FastifyRequest<{
        Params: {
            driverId: string;
        };
    }>,
        reply: FastifyReply) => {
        const { driverId } = request.params;
        const results = await resultService.getResultsByDriver(Number(driverId));
        return reply.status(200).send(results);
    },
    getResultsByTeam: async (request: FastifyRequest<{
        Params: {
            teamId: string;
        };
    }>,
        reply: FastifyReply) => {
        const { teamId } = request.params;
        const results = await resultService.getResultsByTeam(Number(teamId));
        return reply.status(200).send(results);
    },
    getResultsBySeason: async (request: FastifyRequest<{
        Params: {
            season: string;
        };
    }>,
        reply: FastifyReply) => {
        const { season } = request.params;
        const results = await resultService.getResultsBySeason(Number(season));
        return reply.status(200).send(results);
    },
    getResultsByRace: async (request: FastifyRequest<{
        Params: {
            raceId: string;
        };
    }>,
        reply: FastifyReply) => {
        const { raceId } = request.params;
        const results = await resultService.getResultsByRace(Number(raceId));
        return reply.status(200).send(results);
    },
    createResult: async (request: FastifyRequest<{
        Body: {
            position: number,
            points: number,
            laps: number,
            status: string,
            raceId: number,
            driverId: number,
            teamId: number
        };
    }>, reply: FastifyReply) => {
        const { position, points, laps, status, raceId, driverId, teamId } = request.body;
        const result = await resultService.createResult(
            {
                position,
                points,
                laps,
                status,
                raceId,
                driverId,
                teamId
            }
        )
        return reply.status(201).send(result);
    },//Precisa adicionar possibilidade de mudança para teamId, driverId e raceId com suas validações.
    updateResult: async (request: FastifyRequest<{
        Params: {
            id: number;
        };
        Body: {
            position: number,
            points: number,
            laps: number,
            status: string,
            raceId: number,
            driverId: number,
            teamId: number
        };
    }>, reply: FastifyReply) => {
        const { id } = request.params;
        const { position, points, laps, status, raceId, driverId, teamId } = request.body;
        const result = await resultService.updateResult(id,
            {
                position,
                points,
                laps,
                status,
            }
        )
        return reply.status(200).send(result);
    },
    deleteResult: async (request: FastifyRequest<{
        Params: {
            id: number;
        };
    }>,
        reply: FastifyReply) => {
        const { id } = request.params;
        await resultService.deleteResult(id);
        return reply.status(204).send();
    }
}