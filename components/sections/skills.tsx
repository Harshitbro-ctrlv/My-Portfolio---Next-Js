"use client";

import { motion } from "framer-motion";
import { skills, techStack } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/motion";
import { 
  SparklesIcon, 
  CommandLineIcon, 
  CpuChipIcon, 
  CodeBracketIcon,
  WrenchIcon,
  CircleStackIcon 
} from "@heroicons/react/24/outline";

const groupIcons: Record<string, React.ReactNode> = {
  Frontend: <CodeBracketIcon className="w-6 h-6" />,
  Backend: <CpuChipIcon className="w-6 h-6" />,
  Database: <CircleStackIcon className="w-6 h-6" />,
  Languages: <CommandLineIcon className="w-6 h-6" />,
  "AI & Tools": <SparklesIcon className="w-6 h-6" />,
  "Dev Tools": <WrenchIcon className="w-6 h-6" />
};

export function Skills() {
  return (
    <section id="skills" className="section-alt py-14 sm:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="Skills" title="A MERN-focused stack built for real products." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => (
            <motion.article key={group.title} className="glass rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.04 }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <div className="text-base-content">
                {groupIcons[group.title] ?? <WrenchIcon className="w-6 h-6" />}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-base-content">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border-subtle bg-subtle px-3 py-1 text-sm text-muted border">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-14 overflow-hidden relative">
          <motion.div className="flex gap-3 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={`${tech}-${i}`} className="rounded-full border-subtle bg-base-200 px-4 py-2 text-sm text-muted whitespace-nowrap shadow-sm border">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
