import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Flag, User, Trophy } from "lucide-react";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex gap-6">
        <Link href="/" className="text-sm font-bold hover:underline">
          FormulaCore
        </Link>
        <Link href="/corridas" className="text-sm font-medium hover:underline">
          <Flag className="h-4 w-4" />
        </Link>
        <Link href="/pilotos" className="text-sm font-medium hover:underline">
          <User className="h-4 w-4" />
        </Link>
        <Link href="/resultados" className="text-sm font-medium hover:underline">
          <Trophy className="h-4 w-4" />
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  );
}