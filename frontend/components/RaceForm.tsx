// components/RaceForm.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { raceSchema, RaceFormData } from "@/libs/schemas/raceSchema";
import { useCreateRace, useUpdateRace } from "@/libs/hooks/useRaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RaceFormProps {
    raceId?: number; // se presente, é edição; se ausente, é criação
    defaultValues?: RaceFormData;
    onSuccess?: () => void;
}

export function CarForm({ raceId, defaultValues, onSuccess }: RaceFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RaceFormData>({
        resolver: zodResolver(raceSchema),
        defaultValues,
    });

    const createCar = useCreateRace();
    const updateCar = useUpdateRace(raceId ?? 0);

    const isEditing = Boolean(raceId);
    const mutation = isEditing ? updateCar : createCar;

    function onSubmit(data: RaceFormData) {
        mutation.mutate(data, {
            onSuccess: () => {
                onSuccess?.();
            },
        });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Label htmlFor="chassisName">Nome</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="circuitType">Tipo de Circuito</Label>
                <Input id="name" {...register("circuitType")} />
                {errors.circuitType && (
                    <p className="text-sm text-red-500">{errors.circuitType.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="length">Comprimento</Label>
                <Input id="length" {...register("length")} />
                {errors.length && (
                    <p className="text-sm text-red-500">{errors.length.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="chassisName">Número de voltas</Label>
                <Input id="laps" {...register("laps")} />
                {errors.laps && (
                    <p className="text-sm text-red-500">{errors.laps.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="season">Temporada</Label>
                <Input id="season" {...register("season")} />
                {errors.season && (
                    <p className="text-sm text-red-500">{errors.season.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="date">Data</Label>
                <Input id="date" {...register("date")} />
                {errors.date && (
                    <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="chassisName">País</Label>
                <Input id="country" {...register("country")} />
                {errors.country && (
                    <p className="text-sm text-red-500">{errors.country.message}</p>
                )}
            </div>

            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
            </Button>

        </form>
    );
}