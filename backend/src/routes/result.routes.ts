import type { FastifyInstance } from "fastify";
import { ResultController } from "../controllers/result.controller.js";

export async function resultRoutes(server: FastifyInstance) {
    server.get("/results", ResultController.getAllResults);
    server.get("/results/:id", ResultController.getResultById);
    server.get("/results/drivers/:driverId", ResultController.getResultsByDriver);
    server.get("/results/drivers/:teamId", ResultController.getResultsByTeam);
    server.get("/results/drivers/:season", ResultController.getResultsBySeason);
    server.get("/results/drivers/:raceId", ResultController.getResultsByRace);
    server.post("/results", ResultController.createResult);
    server.put("/results/:id", ResultController.updateResult);
    server.delete("/results:id", ResultController.deleteResult);
}