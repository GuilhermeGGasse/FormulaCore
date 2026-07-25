import type { FastifyInstance } from "fastify";
import { RaceController } from "../controllers/race.controller.js";

export async function raceRoutes(server: FastifyInstance) {
   server.get("/races", RaceController.getAllRaces);
   server.get("/races/:id", RaceController.getRacesById);
   server.get("/races/country/:country", RaceController.getRacesByCountry);
   server.get("/races/season/:season", RaceController.getRacesBySeason);
   server.get("/races/circuittype/:circuittype", RaceController.getRacesByCircuitType);
   server.post("/races",
      {
         schema:
         {
            body:
            {
               type: "object",
               required: ["chassisName", "engineSupplier", "power", "weight", "season", "teamId"],
               properties:
               {
                  chassisName: { type: "string" },
                  engineSupplier: { type: "string" },
                  power: { type: "number" },
                  weight: { type: "number" },
                  season: { type: "number" },
                  teamId: { type: "number" },
               },
            },
         },
      }, RaceController.createRace);
   server.put("/races/:id", {
      schema:
      {
         body:
         {
            type: "object",
            required: [],
            properties:
            {
               chassisName: { type: "string" },
               engineSupplier: { type: "string" },
               power: { type: "number" },
               weight: { type: "number" },
               season: { type: "number" },
               teamId: { type: "number" },
            },
         },
      },
   }, RaceController.createRace);
   server.delete("/races/:id", RaceController.deleteRace);
}