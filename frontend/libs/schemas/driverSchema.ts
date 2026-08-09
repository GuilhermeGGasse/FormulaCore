// libs/schemas/driverSchema.ts

import { z } from "zod";

export const driverSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    number: z.number("Número é obrigatório"),
});

export type DriverFormData = z.infer<typeof driverSchema>;