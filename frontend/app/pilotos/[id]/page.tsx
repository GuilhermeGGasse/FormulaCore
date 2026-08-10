// app/pilotos/[id]/page.tsx

"use client";

import { useDriver } from "@/libs/hooks/useDrivers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";

export default function PilotoDetalhePage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: driver, isLoading, isError } = useDriver(id);

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
          <Badge variant="secondary">Número {driver.number}</Badge>
          {driver.nationality && (
            <Badge variant="outline">{driver.nationality}</Badge>
          )}
          <Badge variant="secondary">Número {driver.team.name}</Badge>
          {/* ⚠️ equipe pendente — depende da relação via include no backend */}
        </CardContent>
      </Card>
    </div>
  );
}