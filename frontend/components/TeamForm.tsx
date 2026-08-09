// components/TeamForm.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamSchema, TeamFormData } from "@/libs/schemas/teamSchema"; 
import { useCreateTeam, useUpdateTeam } from "@/libs/hooks/useTeams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";

interface TeamFormProps {
  teamId?: number; // se presente, é edição; se ausente, é criação
  defaultValues?: TeamFormData;
  onSuccess?: () => void;
}

export function TeamForm({ teamId, defaultValues, onSuccess }: TeamFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
    defaultValues,
  });

  const createTeam = useCreateTeam();
  const updateTeam = useUpdateTeam(teamId ?? 0);

  const isEditing = Boolean(teamId);
  const mutation = isEditing ? updateTeam : createTeam;

  function onSubmit(data: TeamFormData) {
    mutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
      </Button>
    </form>
  );
}