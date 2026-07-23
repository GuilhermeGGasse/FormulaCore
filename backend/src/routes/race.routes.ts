import type { FastifyInstance } from "fastify";
import { RaceController } from "../controllers/race.controller.js";

export async function raceRoutes(server: FastifyInstance) {
   server.get("/races", RaceController.getAllRaces);
   server.get("/races/:id", RaceController.getRacesById);
   server.get("/races/country/:country", RaceController.getRacesByCountry);
   server.get("/races/season/:season", RaceController.getRacesBySeason);
   server.get("/races/circuittype/:circuittype", RaceController.getRacesByCircuitType);
   server.post("/races", RaceController.createRace);
   server.put("/races/:id", RaceController.createRace);
   server.delete("races/:id", RaceController.deleteRace);
}