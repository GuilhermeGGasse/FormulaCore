// components/RaceCard.tsx

import { Race } from "@/types/race";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function RaceCard({ race }: { race: Race }) {
  return (
    <Link href={`/corridas/${race.id}`}>
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
          {/* ⚠️ equipe pendente — depende da relação via include no backend */}
        </CardContent>
      </Card>
    </Link>
  );
}