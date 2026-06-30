"use client";

import { CircleStackIcon, CodeBracketIcon, CommandLineIcon, CpuChipIcon, SparklesIcon, WrenchIcon } from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "framer-motion";
import { techStack, skills } from "@/lib/profile";
import { Reveal, SectionHeading } from "@/components/ui/motion";
import { TiltCard } from "@/components/ui/tilt-card";

const groupIcons: Record<string, React.ReactNode> = {
  Frontend: <CodeBracketIcon className="h-5 w-5" />,
  Backend: <CpuChipIcon className="h-5 w-5" />,
  Database: <CircleStackIcon className="h-5 w-5" />,
  Languages: <CommandLineIcon className="h-5 w-5" />,
  "AI & Tools": <SparklesIcon className="h-5 w-5" />,
  "Dev Tools": <WrenchIcon className="h-5 w-5" />,
};

export function Skills() {
  const reduced = useReducedMotion();
  return (
    <section id="skills" className="section-alt py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="Skills" title="A MERN-focused stack built for real products." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05} className="h-full">
              <TiltCard maxTilt={5} className="rounded-lg border border-primary/10 bg-base-200/55 p-5 backdrop-blur-xl sm:p-6">
                <article>
                  <div className="flex items-center justify-between">
                    <motion.span whileHover={reduced ? undefined : { rotate: 6, scale: 1.08 }} className="grid h-10 w-10 place-items-center rounded-md border border-primary/15 bg-primary/10 text-primary">{groupIcons[group.title] ?? <WrenchIcon className="h-5 w-5" />}</motion.span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">{String(group.items.length).padStart(2, "0")} tools</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-base-content">{group.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => <span key={item} className="rounded-md border border-subtle bg-subtle px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary">{item}</span>)}
                  </div>
                  <div aria-hidden className="mt-6 h-px overflow-hidden bg-base-300"><motion.div className="h-full origin-left bg-gradient-to-r from-primary via-brand-light to-transparent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: Math.min(index * 0.05, 0.2) }} /></div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <div className="relative mt-12 overflow-hidden border-y border-subtle py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-3 animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {[...techStack, ...techStack].map((tech, index) => <span key={`${tech}-${index}`} aria-hidden={index >= techStack.length} className="whitespace-nowrap rounded-md border border-subtle bg-base-200/70 px-4 py-2 text-xs text-muted sm:text-sm">{tech}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
