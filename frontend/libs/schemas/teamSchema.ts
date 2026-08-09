// libs/schemas/teamSchema.ts

import { z } from "zod";

export const teamSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

export type TeamFormData = z.infer<typeof teamSchema>;