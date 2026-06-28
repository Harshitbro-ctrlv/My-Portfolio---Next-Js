import type { TimelineItem } from "@/types/profile";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/motion";
import { BuildingOfficeIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-primary/20 to-transparent md:left-1/2" />
      <div className="space-y-7">
        {items.map((item, index) => (
          <Reveal key={`${item.title}-${item.period}`} delay={index * 0.08}>
            <article className="relative grid gap-4 pl-12 md:grid-cols-2 md:gap-10 md:pl-0">
              <div className={index % 2 === 0 ? "md:text-right" : "md:col-start-2"}>
                <div className="absolute left-[11px] top-3 h-3 w-3 rounded-full bg-primary shadow-glow md:left-[calc(50%-6px)]" />
                <div className={`flex items-center gap-1.5 text-primary ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                  <CalendarDaysIcon className="h-3.5 w-3.5" />
                  <p className="font-mono text-xs uppercase tracking-[0.22em]">{item.period}</p>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-base-content">{item.title}</h3>
                <div className={`flex items-center gap-1 mt-1 text-muted ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                  <BuildingOfficeIcon className="h-3.5 w-3.5 shrink-0" />
                  <p className="text-sm">{item.organization}</p>
                </div>
              </div>
              <div className={index % 2 === 0 ? "md:col-start-2 md:row-start-1" : ""}>
                <div className="glass rounded-lg p-5">
                  <p className="leading-7 text-muted">{item.description}</p>
                  {item.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
