// components/Navbar.tsx

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Flag, User, Trophy } from "lucide-react";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-red-600 px-6 py-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-sm font-bold text-white hover:underline">
          FormulaCore
        </Link>
        <Link href="/corridas" className="text-sm font-medium text-white hover:underline">
          <Flag className="h-4 w-4" />
        </Link>
        <Link href="/pilotos" className="text-sm font-medium text-white hover:underline">
          <User className="h-4 w-4" />
        </Link>
        <Link href="/resultados" className="text-sm font-medium text-white hover:underline">
          <Trophy className="h-4 w-4" />
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  );
}