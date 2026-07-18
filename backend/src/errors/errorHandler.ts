import type { FastifyInstance } from "fastify";

export function registerErrorHandler(fastify: FastifyInstance) {

    fastify.setErrorHandler((error, request, reply) => {
        if (error instanceof Error) {
            if (error.message === "DRIVER_NOT_FOUND") {
                return reply.status(404).send({
                    message: "Driver not found."
                });
            }
            if (error.message === "DRIVER_HAS_RESULTS") {
                return reply.status(409).send({
                    message: "Cannot delete driver with existing results."
                });
            }
        }
        return reply.status(500).send({
            message: "Internal server error."
        });
    });
}