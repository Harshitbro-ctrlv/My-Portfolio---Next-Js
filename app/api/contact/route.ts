import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, isRateLimited } from "@/lib/contact";
import { profile } from "@/lib/profile";

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
  const required = ["SMTP_USER", "SMTP_PASS"] as const;
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    return NextResponse.json(
      { message: `Email delivery is temporarily unavailable. Please email ${profile.email} directly.` },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await transporter.sendMail({
      to: profile.email,
      from: process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, `Subject: ${company || "Portfolio inquiry"}`, "", message].join("\n")
    });
  } catch (error) {
    console.error("Contact email delivery failed", error);
    return NextResponse.json(
      { message: `Message could not be delivered. Please email ${profile.email} directly.` },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: "Thanks. Your message has been sent." });
}
