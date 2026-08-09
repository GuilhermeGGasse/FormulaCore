// libs/schemas/raceSchema.ts
import { CircuitType } from "@/types/race";

import { z } from "zod";

export const raceSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  season:  z.number("Season é obrigatório"),
  date: z.string().min(1, "Data é obrigatória"),
  country: z.string("País é obrigatório"),
  circuitType: z.enum(CircuitType).optional(),
  length: z.number().optional(),
  laps: z.number().optional(),
});

export type RaceFormData = z.infer<typeof raceSchema>;