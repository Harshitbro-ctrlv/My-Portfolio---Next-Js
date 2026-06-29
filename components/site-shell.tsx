"use client";

import { ArrowUpIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CommandPalette } from "@/features/command-palette/command-palette";
import { Navbar } from "@/components/navbar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? window.scrollY / height : 0);
      setShowTop(window.scrollY > 720);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    setReady(true);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[90] h-0.5 bg-primary progress-glow transition-all" style={{ width: `${progress * 100}%` }} />
      <AnimatePresence>
        {!ready ? (
          <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-base-100" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <div className="h-12 w-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <Navbar onOpenCommand={() => setPaletteOpen(true)} />
      {children}
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`btn btn-circle btn-primary fixed bottom-6 right-6 z-50 shadow-glow transition-all ${showTop ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
        aria-label="Back to top">
        <ArrowUpIcon className="h-4 w-4" />
      </button>
      <button type="button"
        className="btn btn-sm fixed bottom-6 left-6 z-50 hidden border-subtle bg-subtle text-muted backdrop-blur md:inline-flex gap-2 border"
        onClick={() => setPaletteOpen(true)}>
        <CommandLineIcon className="h-4 w-4" /> Ctrl K
      </button>
    </>
  );
}
