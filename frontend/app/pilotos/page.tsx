// app/pilotos/page.tsx

"use client";

import { Loading } from "@/components/Loading";
import { useDrivers } from "../../libs/hooks/useDrivers";
import { DriverCard } from "@/components/DriverCard";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function PilotosPage() {
  const { data: drivers, isLoading, isError } = useDrivers();

  if (isLoading) return <Loading message="pilotos"/>
  if (isError) return <ErrorMessage message="pilotos"/>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pilotos</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {drivers?.map((driver) => (
          <DriverCard key={driver.id} driver={driver} />

        ))}
      </div>
    </div>
  );
}