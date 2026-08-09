// components/CarForm.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carSchema, CarFormData } from "@/libs/schemas/carSchema";
import { useCreateCar, useUpdateCar } from "@/libs/hooks/useCars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CarFormProps {
    carId?: number; // se presente, é edição; se ausente, é criação
    defaultValues?: CarFormData;
    onSuccess?: () => void;
}

export function CarForm({ carId, defaultValues, onSuccess }: CarFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CarFormData>({
        resolver: zodResolver(carSchema),
        defaultValues,
    });

    const createCar = useCreateCar();
    const updateCar = useUpdateCar(carId ?? 0);

    const isEditing = Boolean(carId);
    const mutation = isEditing ? updateCar : createCar;

    function onSubmit(data: CarFormData) {
        mutation.mutate(data, {
            onSuccess: () => {
                onSuccess?.();
            },
        });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Label htmlFor="chassisName">Chassi</Label>
                <Input id="chassisName" {...register("chassisName")} />
                {errors.chassisName && (
                    <p className="text-sm text-red-500">{errors.chassisName.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="engineSupplier">Fabricante do Motor</Label>
                <Input id="engineSupplier" {...register("engineSupplier")} />
                {errors.engineSupplier && (
                    <p className="text-sm text-red-500">{errors.engineSupplier.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="power">Potência</Label>
                <Input id="power" {...register("power")} />
                {errors.power && (
                    <p className="text-sm text-red-500">{errors.power.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="weight">Peso</Label>
                <Input id="weight" {...register("weight")} />
                {errors.weight && (
                    <p className="text-sm text-red-500">{errors.weight.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="season">Temporada </Label>
                <Input id="season" {...register("weight")} />
                {errors.season && (
                    <p className="text-sm text-red-500">{errors.season.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="teamId">Id do time</Label>
                <Input id="teamId" {...register("weight")} />
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