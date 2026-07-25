import type { FastifyInstance } from "fastify";
import { TeamController } from "../controllers/team.controller.js";

export async function teamRoutes(server: FastifyInstance) {
    server.get("/teams", TeamController.getAllTeams);
    server.get("/teams/:id", TeamController.getTeamById);
    server.post("/teams", {
        schema:
        {
            body:
            {
                properties:
                {
                    type: "object",
                    required: ["name"],
                    properties:
                    {
                        name: { type: "string" }
                    }
                }
            }
        }
    }
        , TeamController.createTeam);
    server.put("/teams/:id",
        {
            schema:
            {
                body:
                {
                    properties:
                    {
                        type: "object",
                        required: ["name"],
                        properties:
                        {
                            name: { type: "string" }
                        }
                    }
                }
            }
        }, TeamController.updateTeam);
    server.delete("/teams/:id", TeamController.deleteTeam)
} 