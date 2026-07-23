import type { FastifyInstance } from "fastify";
import { CarController } from "../controllers/car.controller.js";
import { DriverController } from "../controllers/driver.controller.js";

export async function carRoutes(server: FastifyInstance)
{
    server.get("/cars", CarController.getAllCars);
    server.get("/cars/:id", CarController.getCarById);
    server.get("/cars/engine/:engineSupplier", CarController.getCarsByEngine);
    server.get("/cars/season/:season", CarController.getCarsBySeason);
    server.get("/cars/engine/:team", CarController.getCarsByTeam);
    server.post("/cars", CarController.createCar);
    server.put("/cars", DriverController.updateDriver);
    server.delete("/cars/:id", DriverController.deleteDriver)
}