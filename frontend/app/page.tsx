// app/page.tsx

import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card"; 

export default function HomePage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">FormulaCore</h1>
      <p className="text-muted-foreground mt-2">
        Dados históricos de Fórmula 1 — corridas, pilotos e resultados.
      </p>

      <div className="grid gap-4 sm:grid-cols-3 mt-8 max-w-3xl mx-auto text-left">
        <Link href="/corridas">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Corridas</CardTitle>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/pilotos">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Pilotos</CardTitle>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/resultados">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Resultados</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}