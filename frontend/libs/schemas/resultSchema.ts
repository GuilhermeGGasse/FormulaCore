// libs/schemas/resultSchema.ts

import { z } from "zod";

export const resultSchema = z.object({
    status: z.string().min(1, "Status é obrigatório"),
    position: z.number("Posição é obrigatório"),
    points: z.number("Pontuação é obrigatório"),
    laps: z.number("Número de voltas é obrigatório"),
    raceId: z.number("Id de corrida é obrigatório"),
    carId: z.number("Id de carro é obrigatório"),
    teamId: z.number("Id de equipe é obrigatório"),
    driverId: z.number("Id de piloto é obrigatório"),
});

export type ResultFormData = z.infer<typeof resultSchema>;