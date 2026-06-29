"use client";

import { techStack, skills } from "@/lib/profile";
import { Reveal, SectionHeading } from "@/components/ui/motion";
import {
  SparklesIcon,
  CommandLineIcon,
  CpuChipIcon,
  CodeBracketIcon,
  WrenchIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

const groupIcons: Record<string, React.ReactNode> = {
  Frontend:    <CodeBracketIcon  className="w-5 h-5" />,
  Backend:     <CpuChipIcon      className="w-5 h-5" />,
  Database:    <CircleStackIcon  className="w-5 h-5" />,
  Languages:   <CommandLineIcon  className="w-5 h-5" />,
  "AI & Tools":<SparklesIcon     className="w-5 h-5" />,
  "Dev Tools": <WrenchIcon       className="w-5 h-5" />,
};

export function Skills() {
  return (
    <section id="skills" className="section-alt py-14 sm:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="Skills" title="A MERN-focused stack built for real products." />

        {/* ── Skill cards: 1-col → 2-col (sm) → 3-col (lg) ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05}>
              <article className="glass h-full rounded-xl p-5 sm:p-6 hover:-translate-y-1.5 transition-transform duration-300">
                <div className="text-primary">
                  {groupIcons[group.title] ?? <WrenchIcon className="w-5 h-5" />}
                </div>
                <h3 className="mt-3 text-base font-semibold text-base-content sm:text-lg">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border-subtle bg-subtle px-2.5 py-1 text-xs text-muted border sm:px-3"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ── Tech marquee with edge fades ── */}
        <div
          className="relative mt-12 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {/* Pause on hover/focus for a11y */}
          <div className="flex gap-3 w-max animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="rounded-full border-subtle bg-base-200 px-4 py-1.5 text-xs sm:text-sm text-muted whitespace-nowrap shadow-sm border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
