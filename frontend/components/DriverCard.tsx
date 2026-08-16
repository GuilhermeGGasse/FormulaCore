// components/DriverCard.tsx

import { Driver } from "@/types/driver";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function DriverCard({ driver }: { driver: Driver }) {
  return (
    <Link href={`/pilotos/${driver.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>{driver.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 items-center">
          <Badge variant="secondary">Número {driver.number}</Badge>
          {driver.nationality && (
            <Badge variant="outline">{driver.nationality}</Badge>
          )}
          <Badge variant="outline">{driver.team?.name ?? "Sem equipe"}</Badge>
        </CardContent>
      </Card>
    </Link>
  );
}