// components/DriverCard.tsx

import { Driver } from "@/types/driver";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { Hash, MapPin, Users } from "lucide-react";

export function DriverCard({ driver }: { driver: Driver }) {
  return (
    <Link href={`/pilotos/${driver.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>{driver.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 items-center">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Hash className="h-3 w-3" />
            {driver.number ? `Número ${driver.number}` : "Sem número"}
          </Badge>
          {driver.nationality && (
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {driver.nationality}
            </Badge>
          )}
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {driver.team?.name ?? "Sem equipe"}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}