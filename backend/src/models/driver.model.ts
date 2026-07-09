// backend/src/models/driver.model.ts
import { prisma } from "../utils/prisma-central.js";

export const driverModel = {
  findAll: () => prisma.driver.findMany(),

  findById: (id: number) => prisma.driver.findUnique({ where: { id } }),

  create: (data: { name: string; number: number; teamId: number }) =>
    prisma.driver.create({ data }),

  update: (id: number, data: {
        name?: string;
        number?: number;
        teamId?: number;
  }) => prisma.driver.update({
    where: {id},
    data
  }),


};