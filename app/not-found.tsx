import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-base-100 px-6 text-center">
      <div className="max-w-lg">
        <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-balance md:text-6xl">This page drifted out of orbit.</h1>
        <p className="mt-5 text-base text-white/64">The portfolio is still here. Head back to the main experience.</p>
        <Link href="/" className="btn btn-primary mt-8">
          <ArrowLeft size={18} />
          Back home
        </Link>
      </div>
    </main>
  );
}
