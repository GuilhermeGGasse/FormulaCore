// app/corridas/page.tsx

"use client";

import { useRaces } from "../../libs/hooks/useRaces"; // ⚠️ ajustar path conforme sua estrutura
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CorridasPage() {
  const { data: races, isLoading, isError } = useRaces();

  if (isLoading) return <p>Carregando corridas...</p>;
  if (isError) return <p>Erro ao carregar corridas.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Corridas</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {races?.map((race) => (

          <Link key={race.id} href={`/corridas/${race.id}`}>

            <Card className="hover:shadow-md transition-shadow">
             
              <CardHeader>
                <CardTitle>{race.name}</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-2 items-center">
                <Badge variant="secondary">{race.season}</Badge>
                <Badge variant="outline">{race.country}</Badge>
                {race.circuitType && (
                  <Badge variant="outline">{race.circuitType}</Badge>
                )}
              </CardContent>
              
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}