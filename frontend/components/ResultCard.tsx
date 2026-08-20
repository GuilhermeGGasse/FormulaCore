// components/ResultCard.tsx

import { Result } from "@/types/result";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { Trophy, Users, Flag, Car } from "lucide-react";

export function ResultCard({ result }: { result: Result }) {
  return (
    <Link href={`/resultados/${result.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>{result.driver.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 items-center">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            {result.position}
          </Badge>
          <Badge variant="outline">{result.status}</Badge>
          <Badge variant="outline">{result.points}</Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {result.team.name}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Flag className="h-3 w-3" />
            {result.race.name}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Car className="h-3 w-3" />
            {result.car?.chassisName ?? "—"}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}