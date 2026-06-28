import { TrophyIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { certifications } from "@/lib/profile";
import { Reveal, SectionHeading } from "@/components/ui/motion";

const issuerStyles: Record<string, string> = {
  GeeksforGeeks: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
  "National PG College": "text-blue-600 bg-blue-500/10 border-blue-500/20",
  "Kodbud — Web Development Internship": "text-orange-600 bg-orange-500/10 border-orange-500/20"
};

export function Certifications() {
  return (
    <section id="certifications" className="py-14 sm:py-24 section-alt">
      <div className="section-shell">
        <SectionHeading eyebrow="Certifications" title="Verified learning milestones." />
        <div className="grid gap-4 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <Reveal key={cert.title} delay={index * 0.08}>
              <article className="glass rounded-xl p-6 h-full flex flex-col gap-4 hover:scale-[1.01] transition-transform duration-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <TrophyIcon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-2">
                    <CheckBadgeIcon className="h-4 w-4 text-primary/60" />
                    {cert.period}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-base-content leading-snug">{cert.title}</h3>
                  <span className={`mt-2 inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium ${issuerStyles[cert.issuer] ?? "text-primary bg-primary/10 border-primary/20"}`}>
                    {cert.issuer}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
