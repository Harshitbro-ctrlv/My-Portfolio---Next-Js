"use client";

import Image from "next/image";
import { ArrowTopRightOnSquareIcon, CodeBracketIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/profile";
import type { Project } from "@/types/profile";
import { Badge } from "@/components/ui/badge";
import { Reveal, SectionHeading } from "@/components/ui/motion";
import { TiltCard } from "@/components/ui/tilt-card";

function ProjectMedia({ project, priority }: { project: Project; priority: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.45 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [project.video]);

  if (project.video) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden image-skeleton">
        <video ref={videoRef} src={project.video} poster={project.image} muted loop playsInline preload="none" onCanPlay={() => setLoaded(true)} className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.035] ${loaded ? "opacity-100" : "opacity-0"}`} />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur"><PlayIcon className="h-3 w-3" /> Preview</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden image-skeleton">
      <Image src={project.image} alt={`${project.title} project preview`} fill priority={priority} sizes="(max-width: 1024px) 100vw, 33vw" onLoad={() => setLoaded(true)} className={`object-cover transition duration-700 group-hover:scale-[1.035] ${loaded ? "opacity-100" : "opacity-0"}`} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-base-200/75 via-transparent to-white/5 opacity-60 transition-opacity group-hover:opacity-30" />
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="Projects" title="Things I've built as a MERN Stack learner." />
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.07} className="h-full">
              <TiltCard className="overflow-hidden rounded-lg border border-primary/10 bg-base-200/60 shadow-soft backdrop-blur-xl">
                <article className="flex h-full flex-col">
                  <ProjectMedia project={project} priority={index === 0} />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-base-content">{project.title}</h3>
                      {index === 0 ? <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Featured</span> : null}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((tech, tagIndex) => <Badge key={tech} className="transition-transform duration-200 hover:-translate-y-0.5" style={{ transitionDelay: `${tagIndex * 18}ms` }}>{tech}</Badge>)}
                    </div>
                    <div className="mt-6 flex gap-2 border-t border-subtle pt-5">
                      {project.github ? <a className="btn btn-sm premium-button flex-1 gap-2 border border-subtle bg-subtle text-base-content hover:bg-subtle-2" href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source code`}><CodeBracketIcon className="h-4 w-4" /> Code</a> : null}
                      {project.demo ? <a className="btn btn-sm btn-primary premium-button flex-1 gap-2" href={project.demo} target={project.demo === "#" ? undefined : "_blank"} rel={project.demo === "#" ? undefined : "noreferrer"} aria-label={`Open ${project.title} live demo`}><ArrowTopRightOnSquareIcon className="h-4 w-4" /> Demo</a> : null}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
