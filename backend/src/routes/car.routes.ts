import type { FastifyInstance } from "fastify";
import { CarController } from "../controllers/car.controller.js";
import { DriverController } from "../controllers/driver.controller.js";

export async function carRoutes(server: FastifyInstance) {
    server.get("/cars", CarController.getAllCars);
    server.get("/cars/:id", CarController.getCarById);
    server.get("/cars/engine/:engineSupplier", CarController.getCarsByEngine);
    server.get("/cars/season/:season", CarController.getCarsBySeason);
    server.get("/cars/engine/:team", CarController.getCarsByTeam);
    server.post("/cars",
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
                    }
                }
            }
        }, CarController.createCar);
    server.put("/cars",
        {
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
                    }
                }
            }
        }, DriverController.updateDriver);
    server.delete("/cars/:id", DriverController.deleteDriver)
}