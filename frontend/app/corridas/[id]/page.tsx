// app/corridas/[id]/page.tsx

"use client";

import { useRace } from "@/libs/hooks/useRaces";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";

import { useResultByRace } from "@/libs/hooks/useResults";
import { ResultCard } from "@/components/ResultCard";

export default function CorridaDetalhePage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: race, isLoading, isError } = useRace(id);
  const { data: results, isLoading: isLoadingResults, isError: isErrorResults } = useResultByRace(id);

  if (isLoading) return <p>Carregando corrida...</p>;
  if (isError) return <p>Erro ao carregar corrida.</p>;
  if (!race) return <p>Corrida não encontrado.</p>;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{race.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="secondary">{race.season}</Badge>
          <Badge variant="secondary">{race.country}</Badge>
          {race.circuitType && (
            <Badge variant="outline">{race.circuitType}</Badge>
          )}
          {race.length && (
            <Badge variant="outline">{race.length} km</Badge>
          )}
          {race.laps && (
            <Badge variant="outline">{race.laps} voltas</Badge>
          )}
          <Badge variant="secondary">{race.date ? new Date(race.date).toLocaleDateString() : "Data desconhecida"}</Badge>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Resultados</h2>
        {isLoadingResults && <p>Carregando resultados...</p>}
        {isErrorResults && <p>Erro ao carregar resultados.</p>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results?.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
}