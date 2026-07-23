console.log("Hello, World!");

import fastify from "fastify";
import cors from "@fastify/cors";

import { teams } from "./teams.js";

import { registerErrorHandler } from "./errors/errorHandler.js";
import { registerRoutes } from "./routes/index.js";

const server = fastify({ logger: true });

registerErrorHandler(server);

server.register(cors, {
    origin: "*",
    //methods:["GET", "POST"]
})

registerRoutes(server);

server.listen({ port: 3333 }, () => {
    console.log("Server is running on http://localhost:3333");
});

server.get("/", async (request, response) => {
  response.send({
    message: "FormulaCore is running",
    status: "ok",
  });
});

server.get("/teams", async (request, response) => {
    response.type("application/json").code(200);
    response.send(teams);
});
server.get("/teams/:id", async (request, response) => {
    const { id } = request.params as { id: string };
    const team = teams.find(t => t.id === parseInt(id));
    if (!team) {
        response.status(404).send({ error: "Team not found" });
        return;
    }
    response.type("application/json").code(200);
    response.send(team);
});
