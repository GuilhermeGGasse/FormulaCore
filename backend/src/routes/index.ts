import type { FastifyInstance } from "fastify";
import { driverRoutes } from "./driver.routes.js";
import { teamRoutes } from "./team.routes.js";
import { carRoutes } from "./car.routes.js";
import { raceRoutes } from "./race.routes.js";
import { resultRoutes } from "./result.routes.js";

export async function registerRoutes(server: FastifyInstance) {
    server.register(driverRoutes);
    server.register(teamRoutes);
    server.register(carRoutes);
    server.register(raceRoutes);
    server.register(resultRoutes);
}