// components/ResultsTable.tsx

import { Result } from "@/types/result";
import Link from "next/link";

export function ResultsTable({ results }: { results: Result[] }) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b text-left">
          <th className="p-2">Posição</th>
          <th className="p-2">Piloto</th>
          <th className="p-2">Equipe</th>
          <th className="p-2">Corrida</th>
          <th className="p-2">Pontos</th>
          <th className="p-2">Status</th>
          <th className="p-2">Carro</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result.id} className="border-b hover:bg-muted/50">
            <td className="p-2">{result.position}</td>
            <td className="p-2">
              <Link href={`/resultados/${result.id}`} className="hover:underline">
                {result.driver.name}
              </Link>
            </td>
            <td className="p-2">{result.team.name}</td>
            <td className="p-2">{result.race.name}</td>
            <td className="p-2">{result.points}</td>
            <td className="p-2">{result.status}</td>
            <td className="p-2">{result.car.chassisName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}