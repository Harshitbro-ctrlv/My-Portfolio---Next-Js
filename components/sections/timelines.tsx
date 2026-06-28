import { education, experience } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/motion";
import { Timeline } from "@/components/ui/timeline";

export function ExperienceEducation() {
  return (
    <>
      <section id="experience" className="py-14 sm:py-24">
        <div className="section-shell">
          <SectionHeading eyebrow="Experience" title="Work shaped around clear execution." />
          <Timeline items={experience} />
        </div>
      </section>
      <section id="education" className="section-alt py-14 sm:py-24">
        <div className="section-shell">
          <SectionHeading eyebrow="Education" title="Academic foundation for practical engineering." />
          <Timeline items={education} />
        </div>
      </section>
    </>
  );
}
