// app/resultados/page.tsx

"use client";
import { Loading } from "@/components/Loading";
import { useResults } from "../../libs/hooks/useResults"; 
import { ResultCard } from "@/components/ResultCard";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function resultadosPage() {
  const { data: results, isLoading, isError } = useResults();

  if (isLoading) return <Loading message="resultados"/>
  if (isError) return <ErrorMessage message="resultados"/>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Resultados</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {results?.map((result) => (
              <ResultCard key={result.id} result={result}></ResultCard>
                  
        ))}
      </div>
    </div>
  );
}