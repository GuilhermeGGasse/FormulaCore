// components/DriverForm.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { driverSchema, DriverFormData } from "@/libs/schemas/driverSchema";
import { useCreateDriver, useUpdateDriver } from "@/libs/hooks/useDrivers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DriverFormProps {
    driverId?: number; // se presente, é edição; se ausente, é criação
    defaultValues?: DriverFormData;
    onSuccess?: () => void;
}

export function DriverForm({ driverId, defaultValues, onSuccess }: DriverFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DriverFormData>({
        resolver: zodResolver(driverSchema),
        defaultValues,
    });

    const createDriver = useCreateDriver();
    const updateDriver = useUpdateDriver(driverId ?? 0);

    const isEditing = Boolean(driverId);
    const mutation = isEditing ? updateDriver : createDriver;

    function onSubmit(data: DriverFormData) {
        mutation.mutate(data, {
            onSuccess: () => {
                onSuccess?.();
            },
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Label htmlFor="name">Piloto</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="number">Número</Label>
                <Input id="number" {...register("number")} />
                {errors.number && (
                    <p className="text-sm text-red-500">{errors.number.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="teamId">Equipe (ID)</Label>
                <Input id="teamId" type="number" {...register("teamId", { valueAsNumber: true })} />
                {errors.teamId && (
                    <p className="text-sm text-red-500">{errors.teamId.message}</p>
                )}
            </div>

            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
            </Button>

        </form>
    );

}