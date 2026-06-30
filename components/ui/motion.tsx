"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  id?: string;
  variant?: "up" | "left" | "right" | "scale";
}>;

export function Reveal({ children, className, delay = 0, id, variant = "up" }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    up: { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -24 }, whileInView: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 24 }, whileInView: { opacity: 1, x: 0 } },
    scale: { initial: { opacity: 0, scale: 0.96 }, whileInView: { opacity: 1, scale: 1 } },
  } as const;

  return (
    <motion.div
      id={id}
      className={className}
      initial={prefersReducedMotion ? { opacity: 1, y: 0, x: 0, scale: 1 } : variants[variant].initial}
      whileInView={prefersReducedMotion ? { opacity: 1, y: 0, x: 0, scale: 1 } : variants[variant].whileInView}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -48px" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: Math.min(delay, 0.24) }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-10 max-w-3xl sm:mb-14", className)}>
      <p className="font-mono text-[11px] uppercase tracking-[0.36em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-normal text-balance md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted">{description}</p> : null}
    </Reveal>
  );
}
