import fastify from "fastify";
import cors from "@fastify/cors";

import { registerErrorHandler } from "./errors/errorHandler.js";
import { registerRoutes } from "./routes/index.js";
import { env } from "./config/env.js";

const server = fastify({ logger: true });

registerErrorHandler(server);

server.register(cors, {
    origin: "*",
    //methods:["GET", "POST"]
})

registerRoutes(server);

server.get("/", async (request, response) => {
  response.send({
    message: "FormulaCore is running",
    status: "ok",
  });
});

server.listen({ port: env.port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});

