"use client";

import Link from "next/link";
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { navItems, profile } from "@/lib/profile";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";

export function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed left-0 right-0 top-0 z-50 transition-all duration-300", scrolled ? "nav-scrolled" : "bg-transparent")}> 
      <nav className="section-shell flex h-16 items-center justify-between rounded-full border border-primary/10 bg-base-200/80 px-4 backdrop-blur-md shadow-soft">
        <Link href="#" className="group flex items-center gap-3" aria-label={`${profile.name} home`}>
          <span className="grid h-9 w-9 place-items-center rounded-2xl border border-primary/30 bg-primary/10 font-mono text-sm font-bold text-primary">
            HM
          </span>
          <span className="hidden text-sm font-semibold text-base-content sm:block">{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border-subtle bg-subtle p-1 md:flex border">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm transition-all text-muted hover:text-base-content",
                active === item.href && "bg-primary text-white shadow-sm"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button className="btn btn-ghost btn-sm btn-circle text-base-content" type="button"
            onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <button className="btn btn-ghost btn-sm btn-circle hidden md:inline-flex text-base-content" type="button"
            onClick={onOpenCommand} aria-label="Open command palette">
            <CommandLineIcon className="h-5 w-5" />
          </button>
          <button className="btn btn-ghost btn-sm btn-circle md:hidden text-base-content" type="button"
            onClick={() => setOpen((v) => !v)} aria-label="Open navigation">
            {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="section-shell mb-3 rounded-3xl border border-primary/10 bg-base-200/90 p-2 shadow-soft backdrop-blur-md md:hidden">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}
              className={cn(
                "flex items-center rounded-2xl px-4 py-3 text-sm transition-colors text-muted hover:bg-subtle hover:text-base-content",
                active === item.href && "bg-primary/10 text-primary font-medium"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
