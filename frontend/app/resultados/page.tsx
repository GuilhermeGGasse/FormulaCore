// app/resultados/page.tsx

"use client";
import { Loading } from "@/components/Loading";
import { useResults } from "../../libs/hooks/useResults"; 
import { ResultCard } from "@/components/ResultCard";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ResultsTable } from "@/components/ResultsTable";

export default function resultadosPage() {
  const { data: results, isLoading, isError } = useResults();

  if (isLoading) return <Loading message="resultados"/>
  if (isError) return <ErrorMessage message="resultados"/>

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6">Resultados</h1>
      <ResultsTable results={results ?? []} />       
    </div>
  );
}
