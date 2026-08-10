// components/ResultForm.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resultSchema, ResultFormData } from "@/libs/schemas/resultSchema";
import { useCreateResult, useUpdateResult } from "@/libs/hooks/useResults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResultFormProps {
    resultId?: number
    defaultValues?: ResultFormData;
    onSuccess?: () => void;
}

export function ResultForm({ resultId, defaultValues, onSuccess }: ResultFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResultFormData>({
        resolver: zodResolver(resultSchema),
        defaultValues,
    });

    const createResult = useCreateResult();
    const updateResult = useUpdateResult(resultId ?? 0);

    const isEditing = Boolean(resultId);
    const mutation = isEditing ? updateResult : createResult;

    function onSubmit(data: ResultFormData) {
        mutation.mutate(data, {
            onSuccess: () => {
                onSuccess?.();
            },
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Label htmlFor="driverId">Piloto (ID)</Label>
                <Input id="driverId" type="number" {...register("driverId", { valueAsNumber: true })} />
                {errors.driverId && (
                    <p className="text-sm text-red-500">{errors.driverId.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="raceId">Corrida (ID)</Label>
                <Input id="raceId" type="number" {...register("raceId", { valueAsNumber: true })} />
                {errors.raceId && (
                    <p className="text-sm text-red-500">{errors.raceId.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="teamId">Equipe (ID)</Label>
                <Input id="teamId" type="number" {...register("teamId", { valueAsNumber: true })} />
                {errors.teamId && (
                    <p className="text-sm text-red-500">{errors.teamId.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="carId">Carro (ID)</Label>
                <Input id="carId" type="number" {...register("carId", { valueAsNumber: true })} />
                {errors.carId && (
                    <p className="text-sm text-red-500">{errors.carId.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="position">Posição</Label>
                <Input id="position" type="number" {...register("position", { valueAsNumber: true })} />
                {errors.position && (
                    <p className="text-sm text-red-500">{errors.position.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="points">Pontuação</Label>
                <Input id="points" type="number" {...register("points", { valueAsNumber: true })} />
                {errors.points && (
                    <p className="text-sm text-red-500">{errors.points.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="status">Status</Label>
                <Input id="status" type="number" {...register("status", { valueAsNumber: true })} />
                {errors.status && (
                    <p className="text-sm text-red-500">{errors.status.message}</p>
                )}
            </div>

            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
            </Button>
        </form>
    );
}