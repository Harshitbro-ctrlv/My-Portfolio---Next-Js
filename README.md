# Harshit Mishra Portfolio

Premium SaaS-inspired personal portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, DaisyUI, Framer Motion, Lenis, React Three Fiber, and Nodemailer.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in SMTP credentials:

```bash
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SITE_URL=http://localhost:3000
```

Without these values, the contact form validates correctly but returns a setup message instead of sending email.

## Update profile content

The editable profile data lives in `lib/profile.ts`. LinkedIn blocks automated profile extraction in many server environments, so verify and replace placeholder fields for education, certifications, project URLs, GitHub profile, public email, and resume.

## Deployment

Deploy on Vercel:

1. Push this repository to GitHub.
2. Import it in Vercel.
3. Add the environment variables above.
4. Set `SITE_URL` to your production domain.
5. Deploy.

## Quality checks

```bash
npm run typecheck
npm run build
```
