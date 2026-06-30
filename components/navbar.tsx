"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useRef, useState } from "react";
import { navItems, profile } from "@/lib/profile";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";

export function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const lastScrollRef = useRef(0);
  const active = useActiveSection(useMemo(() => navItems.map((item) => item.href), []));

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const startDark = saved ? saved === "night" : prefersDark;
    setIsDark(startDark);
    applyTheme(startDark);
  }, []);

  function applyTheme(dark: boolean) {
    const theme = dark ? "night" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  function toggleTheme() {
    const newDark = !isDark;
    setIsDark(newDark);
    applyTheme(newDark);
  }

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollRef.current;
        setScrolled(currentY > 12);
        if (Math.abs(delta) > 5) setHidden(currentY > 110 && delta > 0 && !open);
        lastScrollRef.current = currentY;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, [open]);

  return (
    <motion.header
      className={cn("fixed left-0 right-0 top-0 z-50 transition-all duration-300", scrolled ? "nav-scrolled" : "bg-transparent")}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <nav aria-label="Primary navigation" className="section-shell mt-3 flex h-14 items-center justify-between rounded-lg border border-primary/10 bg-base-200/80 px-3 shadow-soft backdrop-blur-xl sm:px-4">
        <Link href="#" className="group flex items-center gap-3" aria-label={`${profile.name} home`}>
          <span className="grid h-9 w-9 place-items-center rounded-md border border-primary/30 bg-primary/10 font-mono text-sm font-bold text-primary">
            HM
          </span>
          <span className="hidden text-sm font-semibold text-base-content sm:block">{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-subtle bg-subtle p-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-md px-3 py-1.5 text-sm text-muted transition-colors duration-200 hover:text-base-content",
                active === item.href && "text-primary"
              )}
            >
              {active === item.href ? <motion.span layoutId="active-nav" className="absolute inset-0 -z-10 rounded-md border border-primary/15 bg-primary/10" transition={{ type: "spring", stiffness: 360, damping: 30 }} /> : null}
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            className="btn btn-ghost btn-sm btn-circle text-base-content"
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <button
            className="btn btn-ghost btn-sm btn-circle hidden text-base-content md:inline-flex"
            type="button"
            onClick={onOpenCommand}
            aria-label="Open command palette"
          >
            <CommandLineIcon className="h-5 w-5" />
          </button>
          <button
            className="btn btn-ghost btn-sm btn-circle text-base-content md:hidden"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            id="mobile-navigation"
            className="section-shell mt-2 rounded-lg border border-primary/10 bg-base-200/95 p-2 shadow-soft backdrop-blur-xl md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center rounded-md px-4 py-3 text-sm text-muted transition-colors hover:bg-subtle hover:text-base-content",
                  active === item.href && "bg-primary/10 font-medium text-primary"
                )}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
