import type { FastifyInstance } from "fastify";
import { DriverController } from "../controllers/driver.controller.js";

export async function driverRoutes(server: FastifyInstance) {
    server.get("/drivers", DriverController.getAllDrivers)
}

/*
 server.get("/products/:id", productController.getById);
  server.post("/products", productController.create);
  server.put("/products/:id", productController.update);
  server.delete("/products/:id", productController.delete);
  */