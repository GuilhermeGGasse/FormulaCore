// app/corridas/[id]/page.tsx

"use client";

import { useRace } from "@/libs/hooks/useRaces";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";

export default function CorridaDetalhePage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: race, isLoading, isError } = useRace(id);

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
          <Badge variant="secondary">Número {race.season}</Badge>
          <Badge variant="secondary">Número {race.country}</Badge>
          <Badge variant="secondary">Número {race.circuitType}</Badge>
          <Badge variant="secondary">Número {race.length}</Badge>
          <Badge variant="secondary">Número {race.laps}</Badge>
          <Badge variant="secondary">{race.date ? new Date(race.date).toLocaleDateString() : "Data desconhecida"}</Badge>
          {/* ⚠️ equipe pendente — depende da relação via include no backend */}
        </CardContent>
      </Card>
    </div>
  );
}