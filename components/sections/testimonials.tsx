import { Quote } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/motion";

const testimonials = [
  {
    quote: "Harshit combines careful engineering with a strong sense for product presentation.",
    name: "Future collaborator",
    role: "Optional testimonial"
  },
  {
    quote: "The work feels polished, fast, and intentional across desktop and mobile.",
    name: "Project reviewer",
    role: "Optional testimonial"
  }
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="Testimonials" title="Designed for social proof when you are ready." />
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <article className="glass rounded-lg p-6">
                <Quote className="text-primary" />
                <p className="mt-5 text-lg leading-8 text-white/72">{testimonial.quote}</p>
                <div className="mt-6">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-white/48">{testimonial.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
