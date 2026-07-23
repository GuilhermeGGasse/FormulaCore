import type { FastifyInstance } from "fastify";
import { TeamController } from "../controllers/team.controller.js";

export async function teamRoutes(server: FastifyInstance) {
    server.get("/teams", TeamController.getAllTeams);
    server.get("/teams/:id", TeamController.getTeamById);
    server.post("/teams", TeamController.createTeam);
    server.put("/teams/:id", TeamController.updateTeam);
    server.delete("/teams/:id", TeamController.deleteTeam) 
} 