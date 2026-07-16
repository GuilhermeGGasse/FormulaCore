import { CircuitType, type Result } from "@prisma/client";
import { prisma } from "../utils/prisma-central.js"

export const raceModel = {
    findAll: () => prisma.race.findMany({
        include: {
            results: true,
        },
    }),
    findById: (id: number) =>
        prisma.race.findUnique(
            {
                where: { id },
                include:
                {
                    results: true,
                    include:
                    {
                        drivers: true,
                        teams: true,
                    }
                }
            }
        ),

    findByName: (name: string) =>
        prisma.race.findMany({
            where: { name }
        }),

    findByFilters: (season?: number, country?: string) => {
        const data: { season?: number, country?: string } = {};
        if (season !== undefined) {
            data.season = season;
        }
        if (country !== undefined) {
            data.country = country;
        }
        return prisma.race.findMany({ where: data });
    },
    findByCircuitType: (circuitType: CircuitType) => {
        return prisma.race.findMany(
            {
                where: { circuitType },
                include:
                {
                    name: true,
                    season: true,
                    country: true,
                    results: true,
                }
            }
        );
    },
    //findlatest
    //findnext
    update: (id: number, data: { name: string, date: Date, season: number }) => {
        return prisma.race.update({ where: { id }, data })
    },
    delete: (id: number) =>
        prisma.race.delete({ where: { id } }),

}
