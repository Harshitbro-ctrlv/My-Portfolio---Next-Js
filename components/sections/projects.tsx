import Image from "next/image";
import { CodeBracketIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { projects } from "@/lib/profile";
import { Badge } from "@/components/ui/badge";
import { Reveal, SectionHeading } from "@/components/ui/motion";

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="Projects" title="Things I've built as a MERN Stack learner." />
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <article className="group glass h-full overflow-hidden rounded-[2rem] border border-primary/10 shadow-soft transition duration-300 hover:-translate-y-1">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-base-content">{project.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => <Badge key={tech}>{tech}</Badge>)}
                  </div>
                  <div className="mt-5 flex gap-2">
                    {project.github && (
                      <a className="btn btn-sm flex-1 gap-2 border-subtle bg-subtle text-base-content hover:bg-subtle-2 border"
                        href={project.github} target="_blank" rel="noreferrer">
                        <CodeBracketIcon className="h-4 w-4" /> Code
                      </a>
                    )}
                    {project.demo && (
                      <a className="btn btn-sm btn-primary flex-1 gap-2" href={project.demo}>
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
