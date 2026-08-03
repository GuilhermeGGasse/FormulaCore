// app/corridas/page.tsx

"use client";

import { useRaces } from "../../libs/hooks/useRaces"; // ⚠️ ajustar path conforme sua estrutura
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RaceCard } from "@/components/RaceCard";
import { Loading } from "@/components/Loading";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function CorridasPage() {
  const { data: races, isLoading, isError } = useRaces();

  if (isLoading) return <Loading message="corridas"/>
  if (isError) return <ErrorMessage message="corridas"/>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Corridas</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {races?.map((race) => (
         <RaceCard key={race.id} race={race} />
        ))}
      </div>
    </div>
  );
}