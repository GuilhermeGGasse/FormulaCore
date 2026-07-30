import type { FastifyInstance } from "fastify";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ConflictError } from "./conflictError.js";
import { ValidationError } from "./validationError.js";

export function registerErrorHandler(fastify: FastifyInstance) {
    fastify.setErrorHandler((error, request, reply) => {
        if (error instanceof NotFoundError) {
            return reply.status(error.statusCode).send({ message: error.message });
        }
        if (error instanceof ConflictError) {
            return reply.status(error.statusCode).send({ message: error.message });
        }
        if (error instanceof ValidationError) {
            return reply.status(error.statusCode).send({ message: error.message });
        }       
        console.error(error);  
        return reply.status(500).send({ message: "Internal server error." });
        //return reply.status(error.statusCode || 500).send({ message: error.message });
    });
}

