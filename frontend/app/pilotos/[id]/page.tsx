// app/pilotos/[id]/page.tsx

"use client";

import { useDriver } from "@/libs/hooks/useDrivers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";

import { useResultByDriver } from "@/libs/hooks/useResults";
import { ResultCard } from "@/components/ResultCard";

export default function PilotoDetalhePage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: driver, isLoading, isError } = useDriver(id);

  const { data: results, isLoading: isLoadingResults, isError: isErrorResults } = useResultByDriver(id);

  if (isLoading) return <p>Carregando piloto...</p>;
  if (isError) return <p>Erro ao carregar piloto.</p>;
  if (!driver) return <p>Piloto não encontrado.</p>;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{driver.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="secondary">{driver.number ? `Número ${driver.number}` : "Sem número"}</Badge>
          {driver.nationality && (
            <Badge variant="outline">{driver.nationality}</Badge>
          )}
          <Badge variant="outline">{driver.team?.name ?? "Sem equipe"}</Badge>
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