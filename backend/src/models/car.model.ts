import { prisma } from "../utils/prisma-central.js";

export const carModel = {
    findAll: () => prisma.car.findMany(),

    findById: (id: number) => prisma.car.findUnique({ where: { id } }),

    create: (data: { chassisName: string; engineSupplier: string; power: number; weight: number; teamId: number, season: number }) =>
        prisma.car.create({ data }),

    update: (id: number, data: {
        chassisName?: string;
        power?: number;
        weight?: number;
        teamId?: number;
    }) =>
        prisma.car.update({
            where: { id },
            data,
        }),

    delete: (id: number) =>
        prisma.car.delete({
            where: { id }
        })
}