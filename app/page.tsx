import { SiteShell } from "@/components/site-shell";
import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { ExperienceEducation } from "@/components/sections/timelines";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { LeetCode } from "@/components/sections/leetcode";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <SiteShell>
      <main>
        <Hero />
        <About />
        <Skills />
        <ExperienceEducation />
        <Projects />
        <Certifications />
        <LeetCode />
        <Contact />
      </main>
      <Footer />
    </SiteShell>
  );
}
