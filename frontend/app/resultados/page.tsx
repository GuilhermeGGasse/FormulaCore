// app/resultados/page.tsx

"use client";

import { useResults } from "../../libs/hooks/useResults"; // ⚠️ ajustar path conforme sua estrutura
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function resultadosPage() {
    const { data: results, isLoading, isError } = useResults();

    if (isLoading) return <p>Carregando resultados...</p>;
    if (isError) return <p>Erro ao carregar resultados.</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Resultados</h1>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                 {results?.map((results) => (

          <Link key={results.id} href={`/corridas/${results.id}`}>

            <Card className="hover:shadow-md transition-shadow">
             
              <CardHeader>
                <CardTitle>{results.driverId}</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-2 items-center">
              <Badge variant="secondary">{results.position}</Badge>
              <Badge variant="outline">{results.status}</Badge>
              <Badge variant="outline">{results.points}</Badge>
             
              </CardContent>
              
            </Card>
          </Link>
        ))}
            </div>
        </div>
    );
}