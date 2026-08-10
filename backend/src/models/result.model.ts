import { prisma } from "../utils/prisma-central.js"

export const resultModel = {
    findAll: () => prisma.result.findMany(
        {
            include: {
                driver: true,
                race: true,
                team: true,
                car: true,
            }
        }
    ),

    findById: (id: number) => {
        return prisma.result.findUnique(
            {
                where: { id },
                include:
                {
                    driver: true,
                    team: true,
                    status: true,
                    points: true,
                    race: true,
                    car:true,
                }
            }
        )
    },

    findByFilters: (driverId?: number, teamId?: number, season?: number, raceId?: number) => {
        const data: { driverId?: number, teamId?: number, race?: { season: number }, raceId?: number } = {};
        if (driverId !== undefined) {
            data.driverId = driverId;
        }
        if (teamId !== undefined) {
            data.teamId = teamId;
        }
        if (season !== undefined) {
            data.race = { season };
        }
        if (raceId !== undefined) {
            data.raceId = raceId;
        }
        return prisma.result.findMany({ where: data,
             include:
                {
                    driver: true,
                    team: true,
                    car:true,
                }
         },            
        );
    },

    create: (data: { position: number, points: number, laps: number, status: string, raceId: number, driverId: number, teamId: number, carId:number }) => {
        return prisma.result.create({ data })
    },

    update: (id: number, data: { position?: number, points?: number, laps?: number, status?: string }) => {
        return prisma.result.update({ where: { id }, data })
    },

    delete: (id: number) =>
        prisma.result.delete({ where: { id } }),
}
