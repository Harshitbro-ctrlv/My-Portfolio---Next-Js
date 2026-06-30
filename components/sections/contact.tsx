"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState, useTransition } from "react";
import { SectionHeading } from "@/components/ui/motion";
import { EnvelopeIcon, ClockIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { profile } from "@/lib/profile";

type Status = "idle" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function submit(formData: FormData) {
    setStatus("idle");
    setMessage("");
    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: { "Content-Type": "application/json" }
        });
        const payload = (await response.json()) as { message?: string };
        setStatus(response.ok ? "success" : "error");
        setMessage(payload.message ?? (response.ok ? "Message sent." : "Something went wrong."));
      } catch {
        setStatus("error");
        setMessage(`Connection failed. Please email ${profile.email} directly.`);
      }
    });
  }

  return (
    <section id="contact" className="py-14 sm:py-24 section-alt">
      <div className="section-shell">
        <SectionHeading eyebrow="Contact" title="Let's build something great together." />
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="glass rounded-xl p-6 flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-base-content">Get in touch</h3>
            <p className="leading-7 text-muted text-sm">
              Open to internships, freelance projects, and collaboration opportunities in web development.
            </p>
            <div className="space-y-4">
              {[
                { icon: <EnvelopeIcon className="h-4 w-4" />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
                { icon: <ClockIcon className="h-4 w-4" />, label: "Response time", value: "Within 24–48 hours" },
                { icon: <BriefcaseIcon className="h-4 w-4" />, label: "Availability", value: "Open to opportunities" }
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-2">{label}</p>
                    {href ? <a href={href} className="break-all text-sm font-medium text-base-content transition-colors hover:text-primary">{value}</a> : <p className="text-sm font-medium text-base-content">{value}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form action={submit} className="glass rounded-xl p-6 flex flex-col gap-4">
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="form-control">
                <span className="label-text text-muted mb-1.5 text-sm font-medium">Name</span>
                <input
                  name="name"
                  required
                  minLength={2}
                  className="input input-bordered bg-base-200 text-base-content placeholder:text-muted-2"
                  placeholder="Your name"
                />
              </label>
              <label className="form-control">
                <span className="label-text text-muted mb-1.5 text-sm font-medium">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="input input-bordered bg-base-200 text-base-content placeholder:text-muted-2"
                  placeholder="you@email.com"
                />
              </label>
            </div>
            <label className="form-control">
              <span className="label-text text-muted mb-1.5 text-sm font-medium">Subject</span>
              <input
                name="company"
                className="input input-bordered bg-base-200 text-base-content placeholder:text-muted-2"
                placeholder="What's this about?"
              />
            </label>
            <label className="form-control">
              <span className="label-text text-muted mb-1.5 text-sm font-medium">Message</span>
              <textarea
                style={{ resize: "none" }}
                rows={4}
                name="message"
                required
                minLength={10}
                className="textarea textarea-bordered min-h-32 bg-base-200 text-base-content placeholder:text-muted-2"
                placeholder="Tell me about your project or idea..."
              />
            </label>
            <button className="btn btn-primary premium-button mt-1 gap-2" disabled={pending} type="submit">
              <PaperAirplaneIcon className="h-4 w-4" />
              {pending ? "Sending..." : "Send Message"}
            </button>
            {message && (
              <p className={`text-sm ${status === "success" ? "text-success" : "text-error"}`} role="status" aria-live="polite">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
