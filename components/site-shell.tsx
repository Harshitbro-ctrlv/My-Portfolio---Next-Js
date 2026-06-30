"use client";

import { ArrowUpIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import Lenis from "lenis";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { CommandPalette } from "@/features/command-palette/command-palette";
import { Navbar } from "@/components/navbar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(-240);
  const cursorY = useMotionValue(-240);
  const spotlightX = useSpring(cursorX, { stiffness: 150, damping: 28, mass: 0.25 });
  const spotlightY = useSpring(cursorY, { stiffness: 150, damping: 28, mass: 0.25 });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32, restDelta: 0.001 });

  useEffect(() => {
    const supportsDesktopMotion = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !supportsDesktopMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      anchors: { offset: -88 },
    });
    lenisRef.current = lenis;
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    let frame = 0;
    let nextVisible = false;
    const onScroll = () => {
      nextVisible = window.scrollY > 720;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setShowTop((current) => current === nextVisible ? current : nextVisible));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const onPointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX - 128);
      cursorY.set(event.clientY - 128);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [cursorX, cursorY, prefersReducedMotion]);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const key = `portfolio-scroll:${window.location.pathname}`;
    const restore = () => {
      if (window.location.hash) return;
      const y = Number(sessionStorage.getItem(key) ?? 0);
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
    };
    const persist = () => sessionStorage.setItem(key, String(window.scrollY));
    restore();
    window.addEventListener("pagehide", persist);
    return () => {
      persist();
      window.history.scrollRestoration = previous;
      window.removeEventListener("pagehide", persist);
    };
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

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  return (
    <>
      <motion.div aria-hidden className="fixed left-0 top-0 z-[90] h-0.5 w-full origin-left bg-primary progress-glow" style={{ scaleX: progress }} />
      <div aria-hidden className="ambient-canvas pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="ambient-grid absolute inset-0" />
        <div className="ambient-beam absolute inset-x-0 top-0 h-[44rem]" />
      </div>
      {!prefersReducedMotion ? (
        <motion.div aria-hidden className="cursor-spotlight pointer-events-none fixed z-0 hidden h-64 w-64 rounded-full md:block" style={{ x: spotlightX, y: spotlightY }} />
      ) : null}
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar onOpenCommand={() => setPaletteOpen(true)} />
      {children}
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <button type="button" onClick={scrollToTop} className={`btn btn-circle btn-primary fixed bottom-5 right-5 z-50 shadow-glow transition-all sm:bottom-6 sm:right-6 ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`} aria-label="Back to top">
        <ArrowUpIcon className="h-4 w-4" />
      </button>
      <button type="button" className="btn btn-sm fixed bottom-6 left-6 z-50 hidden gap-2 border border-subtle bg-base-200/80 text-muted backdrop-blur-xl md:inline-flex" onClick={() => setPaletteOpen(true)} aria-label="Open command palette">
        <CommandLineIcon className="h-4 w-4" /> <span aria-hidden>Ctrl K</span>
      </button>
    </>
  );
}
