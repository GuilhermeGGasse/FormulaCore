// components/ResultCard.tsx

import { Result } from "@/types/result";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function ResultCard({ result }: { result: Result }) {
  return (
    <Link href={`/resultados/${result.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>{result.driver.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 items-center">
          <Badge variant="secondary">{result.position}</Badge>
          <Badge variant="outline">{result.status}</Badge>
          <Badge variant="outline">{result.points}</Badge>
          <Badge variant="outline">{result.team.name}</Badge>
          <Badge variant="outline">{result.race.name}</Badge>
        </CardContent>
      </Card>
    </Link>
  );
}