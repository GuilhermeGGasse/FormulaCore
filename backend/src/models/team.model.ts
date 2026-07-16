import { prisma } from "../utils/prisma-central.js";

export const teamModel = {
    findAll: () => prisma.team.findMany({
        include: {
            drivers: true,
            cars: true,
        },
    }),

  findById: (id: number) =>
    prisma.team.findUnique({
      where: { id },
      include: {
        drivers: true,
        cars: true,
        results: true,
      },
    }),

  findByName: (name: string) =>
    prisma.team.findMany({
      where: {name}
      
    }),
  /*Preciso verificar se a validação de criar um time 
  com nome existente é feita no model ou no service.*/
  create: (data: { name: string }) =>
    prisma.team.create({ data }),

  update: (id: number, data: { name?: string }) =>
    prisma.team.update({ where: { id }, data }),

  delete: (id: number) =>
    prisma.team.delete({ where: { id } }),
};