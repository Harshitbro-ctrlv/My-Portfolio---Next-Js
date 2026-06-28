import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, isRateLimited } from "@/lib/contact";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "Too many messages. Please try again in a minute." }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid message." }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ message: "Message accepted." });
  }

  const { name, email, company, message } = parsed.data;
  const required = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"] as const;
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    return NextResponse.json(
      { message: "Contact form is configured, but email credentials are not set yet." },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    to: process.env.CONTACT_TO_EMAIL,
    from: process.env.CONTACT_FROM_EMAIL,
    replyTo: email,
    subject: `Portfolio inquiry from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, `Company: ${company ?? "N/A"}`, "", message].join("\n")
  });

  return NextResponse.json({ message: "Thanks. Your message has been sent." });
}
