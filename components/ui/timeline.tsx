"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { BuildingOfficeIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import type { TimelineItem } from "@/types/profile";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/motion";

export function Timeline({ items }: { items: TimelineItem[] }) {
  const target = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <div ref={target} className="relative mx-auto max-w-4xl">
      <div aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-primary/15 md:left-1/2" />
      <motion.div aria-hidden className="timeline-track absolute bottom-0 left-4 top-0 w-px md:left-1/2" style={{ scaleY: reduced ? 1 : scaleY }} />
      <div className="space-y-8">
        {items.map((item, index) => (
          <Reveal key={`${item.title}-${item.period}`} delay={index * 0.08} variant={index % 2 === 0 ? "left" : "right"}>
            <article className="relative grid gap-4 pl-12 md:grid-cols-2 md:gap-12 md:pl-0">
              <span aria-hidden className="absolute left-[11px] top-3 z-10 h-3 w-3 rounded-full border-2 border-base-100 bg-primary shadow-glow md:left-[calc(50%-6px)]" />
              <div className={index % 2 === 0 ? "md:text-right" : "md:col-start-2"}>
                <div className={`flex items-center gap-1.5 text-primary ${index % 2 === 0 ? "md:justify-end" : ""}`}><CalendarDaysIcon className="h-3.5 w-3.5" /><p className="font-mono text-xs uppercase tracking-[0.18em]">{item.period}</p></div>
                <h3 className="mt-2 text-xl font-semibold text-base-content">{item.title}</h3>
                <div className={`mt-1 flex items-center gap-1 text-muted ${index % 2 === 0 ? "md:justify-end" : ""}`}><BuildingOfficeIcon className="h-3.5 w-3.5 shrink-0" /><p className="text-sm">{item.organization}</p></div>
              </div>
              <div className={index % 2 === 0 ? "md:col-start-2 md:row-start-1" : ""}>
                <div className="glass rounded-lg p-5 transition-colors hover:border-primary/25">
                  <p className="leading-7 text-muted">{item.description}</p>
                  {item.tags?.length ? <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div> : null}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
