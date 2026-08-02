//components/navbar.tsx;
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center gap-6 border-b px-6 py-4">
      <Link href="/corridas" className="text-sm font-medium hover:underline">
        Corridas
      </Link>
      <Link href="/pilotos" className="text-sm font-medium hover:underline">
        Pilotos
      </Link>
      <Link href="/resultados" className="text-sm font-medium hover:underline">
        Resultados
      </Link>
    </nav>
  );
}