"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRightIcon, ArrowDownTrayIcon, EnvelopeIcon, CodeBracketSquareIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { profile, stats } from "@/lib/profile";
import { Badge } from "@/components/ui/badge";

const HeroOrbit = dynamic(() => import("@/components/hero-orbit").then((mod) => mod.HeroOrbit), { ssr: false });

export function Hero() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden pb-20 pt-28">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(124,231,200,0.14),transparent_24rem),radial-gradient(circle_at_bottom_right,_rgba(255,138,122,0.14),transparent_26rem)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] blur-3xl bg-[radial-gradient(circle,_rgba(124,231,200,0.12),transparent_34%)]" />
      <HeroOrbit />

      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <Badge className="mb-6 border-primary/30 bg-primary/10 text-primary inline-flex items-center gap-2">
            <CodeBracketSquareIcon className="h-4 w-4" />
            MERN Stack Portfolio
          </Badge>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance text-base-content sm:text-6xl lg:text-7xl">
            Harshit Mishra
          </h1>

          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance text-base-content sm:text-6xl lg:text-4xl">
            MERN Stack Developer
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted md:text-xl">
          BCA Student passionate about building full-stack web apps with MongoDB, Express, React & Node.js.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary gap-2 px-5 py-3">
              <EnvelopeIcon className="h-4 w-4" />
              Contact me
            </a>
            <a href={profile.resume} className="btn btn-outline gap-2 px-5 py-3" download>
              <ArrowDownTrayIcon className="h-4 w-4" />
              Resume
            </a>
            <a href="#projects" className="btn btn-ghost gap-2 px-5 py-3 text-muted hover:text-base-content">
              See work
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[1.5rem] border border-primary/10 bg-white/5 p-5 text-center backdrop-blur">
                <p className="text-3xl font-semibold text-base-content">{stat.value}{stat.suffix}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md">
          <div className="glass rounded-[2rem] border border-primary/10 p-4 shadow-soft ring-1 ring-primary/15">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-base-200">
              <Image src={profile.avatar} alt={profile.name} fill priority className="object-cover" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {stats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="rounded-[1.5rem] border border-primary/10 bg-base-200/80 p-4 text-center">
                  <p className="text-lg font-semibold text-base-content">{stat.value}{stat.suffix}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-2">{stat.label}</p>
                </div>
              ))}
              <div className="rounded-[1.5rem] border border-primary/10 bg-primary/10 p-4">
                <p className="text-sm uppercase tracking-[0.22em] text-primary">Current focus</p>
                <p className="mt-2 text-sm text-muted">React · Next.js · Node.js · UI design</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
