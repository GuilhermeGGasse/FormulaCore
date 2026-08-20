// components/RaceCard.tsx

import { Race } from "@/types/race";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { Calendar, MapPin, CircleDot } from "lucide-react";

export function RaceCard({ race }: { race: Race }) {
  return (
    <Link href={`/corridas/${race.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>{race.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 items-center">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {race.season}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {race.country}
          </Badge>
          {race.circuitType && (
            <Badge variant="outline" className="flex items-center gap-1">
              <CircleDot className="h-3 w-3" />
              {race.circuitType}
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}