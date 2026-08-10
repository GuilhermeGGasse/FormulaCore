// app/resultados/[id]/page.tsx

"use client";

import { Loading } from "@/components/Loading";
import { useResults } from "@/libs/hooks/useResults";
import { useResult } from "@/libs/hooks/useResults";
import { ResultCard } from "@/components/ResultCard";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useParams } from "next/navigation";

export default function ResultadoDetalhePage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: result, isLoading, isError } = useResult(id);

if (isLoading) return <Loading message="resultado" />;
if (isError) return <ErrorMessage />;
if (!result) return <p>Resultado não encontrado.</p>;

return (
  <div className="p-6">
    <ResultCard result={result} />
  </div>
);

}