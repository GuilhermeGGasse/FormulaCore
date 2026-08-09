// libs/schemas/carSchema.ts

import { z } from "zod";

export const carSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  chassisName: z.string("Chassi é obrigatório"),
  engineSupplier: z.string("Fabricante de motor é obrigatório"),
  power: z.number("Power é obrigatório"),
  weight: z.number("Weight é obrigatório"),
  season: z.number("Season é obrigatório"),
  teamId: z.number("Id do time é obrigatório"),
});

export type CarFormData = z.infer<typeof carSchema>;