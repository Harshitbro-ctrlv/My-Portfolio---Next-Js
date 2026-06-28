"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id.replace("#", "")))
      .filter((section): section is HTMLElement => section !== null);

    const observers = sections.map((section) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActive(`#${entry.target.id}`);
            }
          },
          { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
        );
        observer.observe(section);
        return observer;
      });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [ids]);

  return active;
}
