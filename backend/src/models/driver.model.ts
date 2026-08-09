// backend/src/models/driver.model.ts
import { prisma } from "../utils/prisma-central.js";

export const driverModel = {
  findAll: () => prisma.driver.findMany(
    {
      include: {
        team: true,
      }
    }
  ),

  findById: (id: number) => prisma.driver.findUnique({
    where: { id },
    include: {
      team: true,
    }
  }),

  findByTeam: (teamId: number) => {
    return prisma.driver.findMany({
      where: { teamId },
      include: {
        team: true,
      }
    })
  },

  findByJolpicaId: (jolpicaId: string) => {
    return prisma.driver.findFirst({
      where: { jolpicaId },
      include: {
        team: true,
      }
    })
  },

  create: (data: { name: string; number: number; teamId?: number, jolpicaId?: string }) =>
    prisma.driver.create({ data }),
  /* Resolvido. Este tipo de erro ocorreu antes, e eu documentei ele. 
  Possuo um arquivo troubleshooting.md documentando todos os problemas que aconteceram 
  no meu trabalho com o projeto, contendo o problema, causa e solução. 
  Foi util agora.*/
  update: (id: number, data: {
    name?: string;
    number?: number;
    teamId?: number;
  }) => prisma.driver.update({
    where: { id },
    data
  }),

  delete: (id: number) => {
    prisma.driver.delete({ where: { id } })
  }
};