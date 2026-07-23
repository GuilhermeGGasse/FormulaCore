import type { FastifyReply, FastifyRequest } from "fastify";
import { teamService } from "../services/team.service.js";

export const TeamController = {
    getAllTeams: async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const teams = teamService.getallTeams();
        return reply.status(200).send(teams);
    },
    getTeamById: async (
        request: FastifyRequest<{
            Params: {
                id: number;
            };
        }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params;
        const team = await teamService.getTeamById(id);
        return reply.status(200).send(team);
    },
    createTeam: async (request: FastifyRequest<{
        Body: {
            name: string;
        };
    }>, reply: FastifyReply) => {
        const { name } = request.body;

        const team = await teamService.createTeam({
            name,
        });
        return reply.status(201).send(team);
    },
    updateTeam: async (
        request: FastifyRequest<{
            Params: {
                id: number;
            };
            Body: {
                name?: string;
            };
        }>,
        reply: FastifyReply
    ) => {

        const { id } = request.params;
        const { name } = request.body;

        if (name !== undefined) {
            const team = await teamService.updateTeam(
                id,
                {
                    name

                }
            );
            return reply.status(200).send(team);
        }

    },
    deleteTeam: async (
        request: FastifyRequest<{
            Params: {
                id: number;
            };
        }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params;

        await teamService.deleteTeam(id);

        return reply.status(204).send();
    }
}