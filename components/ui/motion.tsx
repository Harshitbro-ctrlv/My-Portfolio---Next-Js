"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  id?: string;
}>;

export function Reveal({ children, className, delay = 0, id }: RevealProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mx-auto mb-10 max-w-3xl text-center", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-normal text-balance md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted">{description}</p> : null}
    </Reveal>
  );
}

export { motion };
