import { profile, achievements } from "@/lib/profile";
import { SectionHeading, Reveal } from "@/components/ui/motion";
import { MapPinIcon, AcademicCapIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="About" title="MERN Stack learner, building real things." description={profile.about} />
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {[
            { icon: <MapPinIcon className="h-4 w-4" />, text: profile.location },
            { icon: <AcademicCapIcon className="h-4 w-4" />, text: `${profile.degree} · ${profile.college}` },
            { icon: <BriefcaseIcon className="h-4 w-4" />, text: "Web Dev Intern @ Kodbud" }
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 rounded-full border-subtle bg-subtle px-4 py-2 text-sm text-muted border">
              <span className="text-primary">{icon}</span>
              {text}
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {achievements.map((item, index) => (
            <Reveal key={item} delay={index * 0.08}>
              <div className="glass h-full rounded-xl p-6">
                <span className="font-mono text-sm font-bold text-primary">0{index + 1}</span>
                <p className="mt-4 leading-7 text-muted">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
