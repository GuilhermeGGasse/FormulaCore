import type { FastifyInstance } from "fastify";
import { DriverController } from "../controllers/driver.controller.js";

export async function driverRoutes(server: FastifyInstance) {
    server.get("/drivers", DriverController.getAllDrivers);
    server.get("/drivers/:id", DriverController.getDriverById);
    server.post("/drivers", {
        schema: {
            body: {
                type: "object",
                required: ["name", "number", "teamId"],
                properties: {
                    name: { type: "string" },
                    number: { type: "number" },
                    teamId: { type: "number" },
                },
            },
        },
    }, DriverController.createDriver);
    server.put("/drivers/:id", {
        schema:
        {
            body:
            {
                type: "object",
                required: [],
                properties: {
                    name: { type: "string" },
                    number: { type: "number" },
                    teamId: { type: "number" },
                },
            },
        },
    }, DriverController.updateDriver);
    server.delete("/drivers/:id", DriverController.deleteDriver)
}
