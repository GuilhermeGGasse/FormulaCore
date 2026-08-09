// app/resultados/[id]/page.tsx

"use client";

import { useResult } from "@/libs/hooks/useResults";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";

export default function ResultadoDetalhePage() {
  const params = useParams();
  const id = Number(params.id);

}