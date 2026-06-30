"use client";

import Image from "next/image";
import { ArrowDownTrayIcon, ArrowRightIcon, CodeBracketSquareIcon, CpuChipIcon, EnvelopeIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { profile, stats } from "@/lib/profile";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function MagneticButton({ href, children, icon, variant = "primary" }: { href: string; children: ReactNode; icon: ReactNode; variant?: "primary" | "outline" | "ghost" }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20 });
  const springY = useSpring(y, { stiffness: 260, damping: 20 });

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
  };

  const styles = variant === "primary" ? "btn-primary" : variant === "outline" ? "btn-outline" : "btn-ghost text-muted hover:text-base-content";
  return (
    <motion.a href={href} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }} whileTap={{ scale: 0.97 }} style={{ x: springX, y: springY }} className={cn("btn premium-button gap-2", styles)}>
      {icon}{children}
    </motion.a>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const imageX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const imageY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const words = profile.name.split(" ");

  const onPointerMove = (event: MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 12);
  };

  return (
    <section onMouseMove={onPointerMove} className="relative flex min-h-[92svh] items-center overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28">
      <div aria-hidden className="absolute left-0 top-1/4 h-px w-1/3 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <motion.div initial={reduced ? false : { opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
          <Badge className="mb-5 inline-flex items-center gap-2 border-primary/30 bg-primary/10 text-primary">
            <CodeBracketSquareIcon className="h-4 w-4" /> MERN Stack Portfolio
          </Badge>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Building thoughtful digital experiences</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-normal text-balance text-base-content sm:text-6xl lg:text-7xl">
            {words.map((word, index) => (
              <motion.span key={word} className={cn("mr-[0.22em] inline-block", index === words.length - 1 && "text-gradient-brand animate-gradient")} initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + index * 0.1, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>
            ))}
          </h1>
          <h2 className="mt-4 text-xl font-medium text-muted-3 sm:text-2xl">{profile.role}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{profile.headline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="#contact" icon={<EnvelopeIcon className="h-4 w-4" />}>Contact me</MagneticButton>
            <MagneticButton href={profile.resume} variant="outline" icon={<ArrowDownTrayIcon className="h-4 w-4" />}>Resume</MagneticButton>
            <MagneticButton href="#projects" variant="ghost" icon={<ArrowRightIcon className="h-4 w-4" />}>See work</MagneticButton>
          </div>
          <dl className="mt-10 grid grid-cols-3 border-y border-subtle py-5">
            {stats.map((stat) => (
              <div key={stat.label} className="border-r border-subtle px-3 first:pl-0 last:border-0 last:pr-0">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-muted sm:text-xs">{stat.label}</dt>
                <dd className="mt-2 text-xl font-semibold text-base-content sm:text-2xl">{stat.value}{stat.suffix}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div initial={reduced ? false : { opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} style={{ x: imageX, y: imageY }} className="relative mx-auto w-full max-w-[25rem]">
          <motion.div aria-hidden className="absolute -left-8 top-16 z-20 grid h-11 w-11 place-items-center rounded-lg border border-primary/20 bg-base-200/80 text-primary shadow-soft backdrop-blur-xl" animate={reduced ? undefined : { y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><CpuChipIcon className="h-5 w-5" /></motion.div>
          <motion.div aria-hidden className="absolute -right-6 bottom-20 z-20 grid h-11 w-11 place-items-center rounded-lg border border-accent/20 bg-base-200/80 text-accent shadow-soft backdrop-blur-xl" animate={reduced ? undefined : { y: [0, 7, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><RocketLaunchIcon className="h-5 w-5" /></motion.div>
          <div className="profile-ring rounded-lg">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[7px] bg-base-200">
              <Image src={profile.avatar} alt={`${profile.name}, ${profile.role}`} fill priority sizes="(max-width: 1024px) 400px, 30vw" className="object-cover transition-transform duration-700 hover:scale-[1.025]" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-base-200/60 via-transparent to-white/5" />
              <div className="absolute inset-x-4 bottom-4 rounded-md border border-white/10 bg-base-200/70 p-4 backdrop-blur-xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Current focus</p>
                <p className="mt-1.5 text-sm text-base-content">React · Next.js · Node.js · UI design</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
