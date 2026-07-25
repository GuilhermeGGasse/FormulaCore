import type { FastifyInstance } from "fastify";
import { ResultController } from "../controllers/result.controller.js";

export async function resultRoutes(server: FastifyInstance) {
    server.get("/results", ResultController.getAllResults);
    server.get("/results/:id", ResultController.getResultById);
    server.get("/results/drivers/:driverId", ResultController.getResultsByDriver);
    server.get("/results/teams/:teamId", ResultController.getResultsByTeam);
    server.get("/results/seasons/:season", ResultController.getResultsBySeason);
    server.get("/results/races/:raceId", ResultController.getResultsByRace);
    server.post("/results", {
        schema:
        {
            body:
            {
                type: "object",
                required: ["position", "points", "laps", "status", "raceId", "driverId", "teamId"],
                properties:
                {
                    position: {type :"number"},
                    points: {type :"number"},
                    laps: {type :"number"},
                    status: {type :"string"},
                    raceId: {type :"number"},
                    driverId: {type :"number"},
                    teamId: {type :"number"},
                },
            },
        },
    }, ResultController.createResult);
    server.put("/results/:id",{
        schema:
        {
            body:
            {
                type: "object",
                required: [],
                properties:
                {
                    position: {type :"number"},
                    points: {type :"number"},
                    laps: {type :"number"},
                    status: {type :"string"},
                    raceId: {type :"number"},
                    driverId: {type :"number"},
                    teamId: {type :"number"},
                },
            },
        },
    }, ResultController.updateResult);
    server.delete("/results:id", ResultController.deleteResult);
}